from django.contrib import admin

from .models import Category, Course, CourseDetail, Section, Review, Requirement


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    model = Category
    list_display = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name', 'subject', 'description']


class SectionInline(admin.StackedInline):
    model = Section


class RequirementInline(admin.StackedInline):
    model = Requirement


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    model = Course
    list_display = ['name', 'description', 'author', 'rating', 'created_at', 'updated_at', 'category']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name', 'subject', 'description']
    list_filter = ['rating', 'created_at', 'updated_at']
    inlines = [SectionInline, RequirementInline]


@admin.register(CourseDetail)
class CourseDetailAdmin(admin.ModelAdmin):
    model = CourseDetail
    list_display = ['course', 'video_hours', 'downloadable_resources', 'access_on_devices', 'lifetime_access',
                    'certificate']


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    model = Review
    list_display = ['author', 'course', 'text', 'score', 'updated_at']
    list_filter = ['author', 'course']
    search_fields = ['author', 'course']
