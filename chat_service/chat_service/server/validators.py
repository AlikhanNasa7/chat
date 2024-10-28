from PIL import Image
from rest_framework.exceptions import ValidationError
import os

def validate_icon_image_size(image):
    with Image.open(image) as image:
        if image.width > 70 or image.height > 70:
            raise ValidationError(
                "The maximum allowed dimension is 70x70"
            )


def validate_image_file_extension(image):
    ext = os.path.splitext(image.name)[1]
    valid_extensions = [".jpg", ".jpeg", ".png", ".gif"]
    if not ext.lower() in valid_extensions:
        raise ValidationError("Unsupported file extension")
