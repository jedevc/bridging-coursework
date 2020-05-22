from django.test import TestCase
from rest_framework.test import APIClient
import json

from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from django.utils import timezone

from .views import EducationViewSet

def make_test_case(cv_part, default_content):
    class MyTestCase(TestCase):
        def setUp(self):
            self.user = User.objects.create_superuser(
                username="admin",
                password="admin",
                email="admin@example.com")
            self.token, _ = Token.objects.get_or_create(user=self.user)

        def test_empty(self):
            client = APIClient()
            resp = client.get(f"/api/cv/{cv_part}/")
            content = json.loads(resp.content)
            self.assertEqual(len(content), 0)

        def test_create(self):
            client = APIClient()
            client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

            resp = client.post(f"/api/cv/{cv_part}/", default_content, format="json")
            content = json.loads(resp.content)
            self.assertIn("id", content)

            # deauthenticate
            client.credentials()

            resp = client.get(f"/api/cv/{cv_part}/")
            contents = json.loads(resp.content)
            self.assertEqual(len(contents), 1)

            resp = client.get(f"/api/cv/{cv_part}/{content['id']}/")
            content = json.loads(resp.content)
            self.assertIn("id", content)

        def test_delete(self):
            client = APIClient()
            client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

            resp = client.post(f"/api/cv/{cv_part}/", default_content, format="json")
            content = json.loads(resp.content)
            self.assertIn("id", content)

            resp = client.delete(f"/api/posts/{content['id']}/")

            resp = client.get(f"/api/posts/{content['id']}/")
            content = json.loads(resp.content)
            self.assertEqual(resp.status_code, 404)
            self.assertNotIn("id", content)

    return MyTestCase

EducationTestCase = make_test_case("education", {
    "qualification": "Computer Science BSc",
    "location": "University of Birmingham",
    "icon": "fa fa-university",
    "start": "2020",
    "end": "2023",
    "notes": "",
})
WorkTestCase = make_test_case("work", {
    "name": "Generic Fintech Company",
    "role": "Intern",
    "location": "London",
    "icon": "fa fa-dollar-sign",
    "start": "2023",
    "end": "Present",
    "notes": "",
})
VolunteeringTestCase = make_test_case("volunteer", {
    "name": "International Charity Group",
    "role": "Organizer",
    "location": "Birmingham",
    "icon": "fa fa-hamburger",
    "start": "2021",
    "end": "Present",
    "notes": "",
})
ProjectTestCase = make_test_case("projects", {
    "name": "Useless tool",
    "link": "http://example.com",
    "icon": "fa fa-utensils",
    "notes": "",
})
AwardTestCase = make_test_case("awards", {
    "name": "School award",
    "giver": "University of Birmingham",
    "icon": "fa fa-school",
    "date": "2020",
    "notes": "",
})