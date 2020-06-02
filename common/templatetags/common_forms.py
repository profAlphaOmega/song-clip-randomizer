from __future__ import unicode_literals
from django import forms
from django import template
from django.forms.utils import flatatt
from django.template.loader import get_template
from django.utils.safestring import mark_safe
from string import Template

register = template.Library()



class CheckRadioRender(object):
    def __init__(self, type_, field, attrs={}):
        assert type_ in ('radio', 'checkbox')
        assert isinstance(field.field.widget,
            (forms.RadioSelect, forms.CheckboxSelectMultiple))
        self.type = type_
        self.field = field
        self.name = field.html_name
        self.value = field.value()
        self.id = field.auto_id
        self.choices = field.field.choices
        self.attrs = attrs

    def render(self):
        html = ''
        for i, choice in enumerate(self.choices):
            html += ("<div class='{}'><label>".format(self.type)
                    + self.tag(choice, i)
                    + choice[1]
                    + "</label></div>")
        return mark_safe(html)

    def render_inline(self):
        html = '<div>'
        for i, choice in enumerate(self.choices):
            html += ("<label class='{}-inline'>".format(self.type)
                    + self.tag(choice, i)
                    + choice[1]
                    + "</label>")
        return html + "</div>"

    def tag(self, choice, index):
        choice_value = choice[0]
        attrs = self.attrs.copy()
        if 'id' not in attrs:
            attrs['id'] = self.id
        attrs['id'] = '{}_{}'.format(attrs['id'], index)

        if isinstance(self.value, (list, tuple)) and choice_value in self.value:
            attrs['checked'] = 'checked'
        elif self.value == choice_value:
            attrs['checked'] = 'checked'

        final_attrs = dict(attrs, type=self.type, name=self.name,
            value=choice_value)

        return mark_safe('<input{} />'.format(flatatt(final_attrs)))



@register.simple_tag
def form_render_input(field, inline=False):
    attrs = { 'class': 'form-control', }

    # Special rendering for RadioSelect and CheckboxSelectMultiple
    if isinstance(field.field.widget,
            (forms.RadioSelect, forms.CheckboxSelectMultiple)):
        if isinstance(field.field.widget, forms.RadioSelect):
            type_ = 'radio'
        if isinstance(field.field.widget, forms.CheckboxSelectMultiple):
            type_ = 'checkbox'

        renderer = CheckRadioRender(type_, field)
        if inline:
            return renderer.render_inline()
        return renderer.render()

    if isinstance(field.field.widget, forms.CheckboxInput):
        del attrs['class']

    if isinstance(field.field, forms.EmailField):
        attrs['type'] = 'email'

    if field.field.required:
        attrs['required'] = ''
    return field.as_widget(attrs=attrs)


@register.simple_tag
def field(*args, **kwargs):
    tpl = get_template(kwargs.get('template', "forms/field.html"))
    width = 12 / len(args)
    fields = []
    for field in args:
        label  = "forms/label.html"
        hlp    = "forms/help.html"
        errors = "forms/errors.html"
        if isinstance(field.field.widget, forms.CheckboxInput):
            fields.append((field, width, None, hlp, errors, True))
        else:
            fields.append((field, width, label, hlp, errors, False))

    return tpl.render(context={
        'fields': fields,
        'cr_inline': kwargs.get('inline', False)})
