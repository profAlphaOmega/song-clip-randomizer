from __future__ import unicode_literals
from django.core import validators
#from django.core.exceptions import ValidationError
#from django.utils.deconstruct import deconstructible


################################################################################
# Common validators
################################################################################
validate_obscode = validators.RegexValidator(
    regex=r'^[A-Z0-9]{1,6}$',
    message=u'Obscode must be 1-6 uppercase letters A-Z or digits')
