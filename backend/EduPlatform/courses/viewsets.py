from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .models import Category, Course, CourseDetail, Section, Review, Requirement
from .serializers import CourseSerializer, CategorySerializer
from rest_framework.decorators import action


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    http_method_names = ['get']
    permission_classes = [AllowAny]

    def get_queryset(self):
        categories = Category.objects.all()
        return categories


class CourseViewSet(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    http_method_names = ['get']
    permission_classes = [AllowAny]

    def get_queryset(self):
        all_courses = Course.objects.all()
        return all_courses

    @action(detail=False, methods=['get'], url_path='registered')
    def registered_courses(self, request):
        user = request.user
        registered_courses = user.courses.all()
        serializer = CourseSerializer(registered_courses, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='(?P<category_slug>[^/.]+)/courses')
    def courses_by_category(self, request, category_slug=None):
        category = Category.objects.get(slug=category_slug)
        courses = category.courses.all()
        serializer = self.get_serializer(courses, many=True)
        return Response(serializer.data)


