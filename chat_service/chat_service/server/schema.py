from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema, OpenApiParameter

from .serializers import ChannelSerializer, ServerSerializer

server_list_docs = extend_schema(
    responses=ServerSerializer(many=True),
    parameters=[
        OpenApiParameter(
            name='category',
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description="Category of the servers to retrieve",
        ),
        OpenApiParameter(
            name='qty',
            type=OpenApiTypes.INT,
            location=OpenApiParameter.QUERY,
            description="Number of the servers to retrieve",
        ),
        OpenApiParameter(
            name='by_user',
            type=OpenApiTypes.BOOL,
            location=OpenApiParameter.QUERY,
            description="Filter servers by the current authenticated user",
        ),
        OpenApiParameter(
            name='with_num_members',
            type=OpenApiTypes.BOOL,
            location=OpenApiParameter.QUERY,
            description="Include the number of members of the server in the response",
        )
    ]
)