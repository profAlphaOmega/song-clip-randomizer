from django import forms

from .models import Person, Contact

class PersonForm(forms.ModelForm):
    class Meta:
        model = Person
        fields = ['username', 'email' ]

    def clean_email(self):
        '''example of custom validator, overwrites built in validator'''
        email = self.cleaned_data['email']
        if not "@gmail.com" in email:
            raise forms.ValidationError("Please use a gmail account")
        return email

# class ContactForm(forms.Form):
#     first_name = forms.CharField()
#     last_name = forms.CharField()
#     email = forms.EmailField()
#     message = forms.CharField()

class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = ['email', 'message', 'first_name', 'last_name']
        widgets = {
            'message': forms.Textarea(attrs={'rows': 4}), # sizes the form field rows, you can also do cols
        }

class UploadForm(forms.Form):
    file_field = forms.FileField(
        widget=forms.ClearableFileInput(attrs={'multiple': True})
        )

