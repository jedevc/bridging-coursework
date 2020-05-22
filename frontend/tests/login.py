from django.contrib.staticfiles.testing import StaticLiveServerTestCase

from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException

from django.utils import timezone
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

import time

class LoginTest(StaticLiveServerTestCase):
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

    def test_login(self):
        # The site creator navigates to the home page
        self.browser.get(self.live_server_url)

        # The site creator is able to view the home page without logging in
        with self.assertRaises(NoSuchElementException):
            self.browser.find_element_by_name("username")
        with self.assertRaises(NoSuchElementException):
            self.browser.find_element_by_name("password")

        # The creator clicks the login button
        login = self.browser.find_element_by_link_text("Login")
        login.click()

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

        # The user is now logged in
        token = self.browser.execute_script("return window.localStorage.getItem('token');");
        self.assertEquals(token, f'"{self.token.key}"')

    def test_logout(self):
        # The site creator is already logged in
        self.browser.get(self.live_server_url)
        self.browser.execute_script(f"window.localStorage.setItem('token', '\"{self.token}\"');");

        # Sanity check: the user is actually logged in
        token = self.browser.execute_script("return window.localStorage.getItem('token');");
        self.assertEquals(token, f'"{self.token.key}"')

        # The site creator navigates to the home page
        self.browser.get(self.live_server_url)

        # The creator clicks the logout button
        login = self.browser.find_element_by_link_text("Logout")
        login.click()

        # The user is now logged-out
        token = self.browser.execute_script("return window.localStorage.getItem('token');");
        self.assertEquals(token, '""')
