from django.db import models

from user.models import User

from django.core.validators import MinValueValidator, MaxValueValidator


# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField()

    def __str__(self):
        return self.name


class Review(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    score = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    course = models.ForeignKey('Course', on_delete=models.CASCADE, related_name='reviews')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.text}"


class Requirement(models.Model):
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=100)

    course = models.ForeignKey('Course', on_delete=models.CASCADE, related_name='requirements')


class Course(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='author_courses')
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='category_courses')
    language = models.CharField(max_length=20)

    students = models.ManyToManyField(User, related_name='student_courses')

    rating = models.FloatField(validators=[MinValueValidator(1), MaxValueValidator(5)], blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name}"

    def get_discount(self):
        return "80%"


class CourseDetail(models.Model):
    course = models.OneToOneField(Course, on_delete=models.CASCADE, related_name='details')
    video_hours = models.DecimalField(max_digits=5, decimal_places=2)
    downloadable_resources = models.IntegerField()
    access_on_devices = models.BooleanField(default=True)
    lifetime_access = models.BooleanField(default=True)
    certificate = models.BooleanField(default=True)


class Section(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    course = models.ForeignKey('Course', on_delete=models.CASCADE, related_name='sections')
    content = models.TextField()
    order = models.IntegerField()

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.course}: {self.name}, {self.description}"
