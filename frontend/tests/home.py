from django.contrib.staticfiles.testing import StaticLiveServerTestCase

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException

from django.utils import timezone
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from blog.models import Post

import time

class HomeTest(StaticLiveServerTestCase):
    def setUp(self):
        super().setUpClass()

        self.browser = webdriver.Firefox()
        self.browser.implicitly_wait(5)

        self.user = User.objects.create_superuser(
            username="admin",
            password="admin",
            email="admin@example.com")
        self.token, _ = Token.objects.get_or_create(user=self.user)

    def tearDown(self):
        self.browser.quit()

    def test_home_page(self):
        # A viewer loads the page
        self.browser.get(self.live_server_url)

        # The viewer looks for the title, and finds the name of the site owner
        header_text = self.browser.find_element_by_tag_name('h1').text
        self.assertIn("Justin Chadwell", header_text)

        # The viewer looks for a link to the blog
        blog_link = self.browser.find_element_by_link_text('Blog')
        self.assertIn("/blog", blog_link.get_attribute("href"))

        # The viewer looks for a link to the CV
        blog_link = self.browser.find_element_by_link_text('CV')
        self.assertIn("/cv", blog_link.get_attribute("href"))

        # A viewer looks for the GitHub link
        link = self.browser.find_element_by_link_text('GitHub')
        self.assertIn("/github.com/", link.get_attribute("href"))
