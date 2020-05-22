from django.contrib.staticfiles.testing import StaticLiveServerTestCase

from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException

from django.utils import timezone
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from blog.models import Post

import time

class PostTest(StaticLiveServerTestCase):
    def setUp(self):
        super().setUpClass()

        self.browser = webdriver.Firefox()
        self.browser.implicitly_wait(1)

        self.user = User.objects.create_superuser(
            username="admin",
            password="admin",
            email="admin@example.com")
        self.token, _ = Token.objects.get_or_create(user=self.user)

    def tearDown(self):
        self.browser.quit()

    def test_post_login(self):
        # The site creator navigates to the blog
        self.browser.get(self.live_server_url + '/blog')

        # The site creator is able to view the blog index without logging in
        with self.assertRaises(NoSuchElementException):
            self.browser.find_element_by_name("username")
        with self.assertRaises(NoSuchElementException):
            self.browser.find_element_by_name("password")

        # The creator clicks the new button
        button = self.browser.find_element_by_link_text("New")
        button.click()

        # The creator is prompted to login now
        username = self.browser.find_element_by_name("username")
        password = self.browser.find_element_by_name("password")
        submit = self.browser.find_element_by_xpath('//button[text()="Submit"]')

        # The creator logs in
        username.send_keys("admin")
        password.send_keys("admin")
        submit.click()

        # The login prompt disappears
        with self.assertRaises(NoSuchElementException):
            self.browser.find_element_by_name("username")
        with self.assertRaises(NoSuchElementException):
            self.browser.find_element_by_name("password")

    def test_post_create(self):
        # The site creator is already logged in
        self.browser.get(self.live_server_url + '/blog')
        self.browser.execute_script(f"window.localStorage.setItem('token', '\"{self.token}\"');");

        # The site creator navigates to the post creation page
        self.browser.get(self.live_server_url + '/blog/new')

        # The site creator is prompted to enter details
        title = self.browser.find_element_by_name("title")
        date = self.browser.find_element_by_name("published_date")
        summary = self.browser.find_element_by_name("summary")
        content = self.browser.find_element_by_name("content")
        submit = self.browser.find_element_by_xpath('//button[text()="Submit"]')

        # The date field is already prepopulated
        self.assertGreater(len(date.get_attribute("value")), 1)

        # The site creator creates a new post
        title.send_keys("Sample post")
        summary.send_keys("Sample summary")
        content.send_keys("Sample content")
        submit.click()

        # The post is now viewable
        title = self.browser.find_element_by_xpath('//*[@class="title"]')
        self.assertEquals(title.text, "Sample post")
        content = self.browser.find_element_by_xpath('//div[@class="content"]/p')
        self.assertEquals(content.text, "Sample content")
        
        # The creator navigates back to the blog
        self.browser.get(self.live_server_url + '/blog')

        # The creator finds a link to the new post
        link = self.browser.find_element_by_xpath('//a[contains(@href, "/blog/")]//*[@class="title"]')
        self.assertEquals(link.text, "Sample post")

    def test_post_view(self):
        # There is already a single post
        Post.objects.create(
            title="A new post title",
            summary="A quick summary",
            content="Some quick content",
            published_date=timezone.now())

        # A viewer nagivates to the blog
        self.browser.get(self.live_server_url + '/blog')

        # The viewer clicks on the post
        link = self.browser.find_element_by_xpath('//a//*[contains(text(), "A new post title")]')
        link.click()

        # The post is now viewable
        title = self.browser.find_element_by_xpath('//*[contains(text(), "A new post title")]')
        content = self.browser.find_element_by_xpath('//div[@class="content"]/p')
        self.assertEquals(content.text, "Some quick content")

    def test_post_edit(self):
        # There is already a single post
        post = Post.objects.create(
            title="A new post title",
            summary="A quick summary",
            content="Some quick content",
            published_date=timezone.now())

        # The site creator is already logged in
        self.browser.get(self.live_server_url + '/cv')
        self.browser.execute_script(f"window.localStorage.setItem('token', '\"{self.token}\"');");

        # The creator nagivates to the post edit page
        self.browser.get(self.live_server_url + f'/blog/{post.id}/edit')

        # The creator modifies the page title
        title = self.browser.find_element_by_name("title")
        title.clear()
        title.send_keys("A very different title")

        # The creator clicks the submit button
        submit = self.browser.find_element_by_xpath('//*[contains(text(), "Submit")]')
        submit.click()

        # The creator goes back to the post
        self.browser.get(self.live_server_url + f'/blog/{post.id}')

        # The original qualification item is now gone
        with self.assertRaises(NoSuchElementException):
            self.browser.find_element_by_xpath('//*[contains(text(), "A new post title")]')

        # But, it's been replaced by the new one
        self.browser.find_element_by_xpath('//*[contains(text(), "A very different title")]')

    def test_post_delete(self):
        # There is already a single post
        post = Post.objects.create(
            title="A new post title",
            summary="A quick summary",
            content="Some quick content",
            published_date=timezone.now())

        # The site creator is already logged in
        self.browser.get(self.live_server_url + '/cv')
        self.browser.execute_script(f"window.localStorage.setItem('token', '\"{self.token}\"');");

        # The creator nagivates to the post edit page
        self.browser.get(self.live_server_url + f'/blog/{post.id}/edit')

        # The creator clicks the delete button
        delete = self.browser.find_element_by_xpath('//*[contains(text(), "Delete")]')
        delete.click()

        # The creator nagivates to the post index
        self.browser.get(self.live_server_url + f'/blog/')

        # The post is now gone
        with self.assertRaises(NoSuchElementException):
            self.browser.find_element_by_xpath('//*[contains(text(), "A new post title")]')
