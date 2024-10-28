from rest_framework import serializers

from .models import Category, Course, CourseDetail, Section, Review, Requirement
from rest_framework.reverse import reverse


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'slug', 'description')

    def create(self, validated_data):
        category = Category.objects.create(**validated_data)
        return category


class CourseDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseDetail
        fields = ['video_hours', 'downloadable_resources', 'access_on_devices', 'lifetime_access', 'certificate']


class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ['id', 'name', 'description', 'course']


class RequirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requirement
        fields = ['id', 'name', 'course', 'type']


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

    def create(self, validated_data):
        review = Review.objects.create(**validated_data)
        return review


class CourseSerializer(serializers.ModelSerializer):
    details = CourseDetailSerializer(many=True, read_only=True)
    sections = SectionSerializer(many=True, read_only=True)
    requirements = RequirementSerializer(many=True, read_only=True)

    course_discount = serializers.SerializerMethodField(read_only=True)
    url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Course
        fields = ('url', 'id', 'name', 'slug', 'description', 'category', 'author', 'language',
                  'rating', 'details', 'requirements', 'course_discount')

    def get_url(self, obj):
        request = self.context.get('request')

        if request in None:
            return None

        return reverse("", kwargs={'pk': obj.pk}, request=request)

    def get_course_discount(self, obj):
        if not hasattr(obj, 'id'):
            return None
        if not isinstance(obj, Course):
            return None
        return obj.get_discount()

    def create(self, validated_data):
        details_data = validated_data.pop('details')
        sections_data = validated_data.pop('sections')
        requirements_data = validated_data.pop('requirements')
        course = Course.objects.create(**validated_data)
        CourseDetail.objects.create(course=course, **details_data)
        for section in sections_data:
            Section.objects.create(course=course, **section)
        for requirement in requirements_data:
            Requirement.objects.create(course=course, **requirement)
        return course
