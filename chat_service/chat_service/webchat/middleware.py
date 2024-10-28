import jwt
from channels.db import database_sync_to_async
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from account.models import Account


@database_sync_to_async
def get_user(scope):
    token = scope["token"]
    model = get_user_model()
    user_id = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])["user_id"]

    try:
        return model.objects.get(pk=user_id)
    except model.DoesNotExist:
        return AnonymousUser()


class JWTAuthMiddleware:

    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        headers_dict = dict(scope["headers"])
        cookies_str = headers_dict.get(b"cookie", b"").decode("utf-8")
        cookies = {cookie.split("=")[0]: cookie.split("=")[1] for cookie in cookies_str.split("; ")}
        access = cookies.get("access")

        scope["token"] = access
        scope["user"] = await get_user(scope)

        print(cookies)

        return await self.app(scope, receive, send)


var = {b'host': b'127.0.0.1:8000',
       b'connection': b'Upgrade',
       b'pragma': b'no-cache',
       b'cache-control': b'no-cache',
       b'user-agent': b'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
       b'upgrade': b'websocket',
       b'origin': b'http://localhost:5173',
       b'sec-websocket-version': b'13',
       b'accept-encoding': b'gzip, deflate, br, zstd',
       b'accept-language': b'en-US,en;q=0.9',
       b'cookie': b'refresh=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNjY2MzYyOCwiaWF0IjoxNzI2MDU4ODI4LCJqdGkiOiJiZTRlNmIxOGQ0ZWQ0MDkzYjgzMmI0NTFkZWUwZTg1OSIsInVzZXJfaWQiOjEsImV4YW1wbGUiOiJleGFtcGxlIn0.O5uptxlxCOT5N_NweeBRBwmH1RNE3bjWeSe-evbU8bo; access=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI2MTMzMTA1LCJpYXQiOjE3MjYwNTg4MjgsImp0aSI6ImUyOTM3ZjI5OTg0NDQ2YzQ5Y2QxMGUxM2M5ZDc3NGIwIiwidXNlcl9pZCI6MSwiZXhhbXBsZSI6ImV4YW1wbGUifQ.Dg8pzSgJkJde9MGGkGMWM5tt7KaHdz4BSfyGZy8tf-U',
       b'sec-websocket-key': b'cJCKLXrZaQd3G6FXReXWgw==',
       b'sec-websocket-extensions': b'permessage-deflate; client_max_window_bits'}
