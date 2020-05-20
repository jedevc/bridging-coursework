from django.test import TestCase
from rest_framework.test import APIClient
import json

from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from django.utils import timezone

from .views import PostViewSet

class PostTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_superuser(
            username="admin",
            password="admin",
            email="admin@example.com")
        self.token, _ = Token.objects.get_or_create(user=self.user)

    def test_no_posts(self):
        client = APIClient()

        resp = client.get("/api/posts/", format="json")
        posts = json.loads(resp.content)
        self.assertEqual(len(posts), 0)

    def test_create_unpublished_post(self):
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

        resp = client.post("/api/posts/", {
            "title": "Sample post",
            "summary": "Sample summary",
            "content": "Sample content",
        }, format="json")

        post = json.loads(resp.content)
        self.assertIn("id", post)

        resp = client.get("/api/posts/")
        posts = json.loads(resp.content)
        self.assertEqual(len(posts), 0)

        resp = client.get(f"/api/posts/{post['id']}/")
        post = json.loads(resp.content)
        self.assertNotIn("id", post)

    def test_create_published_post(self):
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

        resp = client.post("/api/posts/", {
            "title": "Sample post",
            "summary": "Sample summary",
            "content": "Sample content",
            "published_date": timezone.now(),
        }, format="json")

        post = json.loads(resp.content)
        self.assertIn("id", post)

        resp = client.get("/api/posts/")
        posts = json.loads(resp.content)
        self.assertEqual(len(posts), 1)

        resp = client.get(f"/api/posts/{post['id']}/")
        post = json.loads(resp.content)
        self.assertIn("id", post)

    def test_publish_post(self):
        pass

    def test_edit_post(self):
        pass

    def test_delete_post(self):
        pass

    def test_check_requires_authentication(self):
        pass
