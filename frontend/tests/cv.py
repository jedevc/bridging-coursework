from django.contrib.staticfiles.testing import StaticLiveServerTestCase

from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException

from django.utils import timezone
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from cv.models import Education

import time

class CvTest(StaticLiveServerTestCase):
    def setUp(self):
        super().setUpClass()

        options = webdriver.FirefoxOptions()
        options.set_headless()
        self.browser = webdriver.Firefox(options=options)
        self.browser.implicitly_wait(1)

        self.user = User.objects.create_superuser(
            username="admin",
            password="admin",
            email="admin@example.com")
        self.token, _ = Token.objects.get_or_create(user=self.user)

    def tearDown(self):
        self.browser.quit()

    def test_default_data(self):
        # A user navigates to the cv
        self.browser.get(self.live_server_url + '/cv')

        # The user observes the default information
        self.browser.find_element_by_xpath('//*[text()="Justin Chadwell"]')
        self.browser.find_element_by_xpath('//*[contains(text(), "Computer Science Student")]')

        # The user observes the category titles
        self.browser.find_element_by_xpath('//*[text()="Education"]')
        self.browser.find_element_by_xpath('//*[text()="Projects"]')
        self.browser.find_element_by_xpath('//*[text()="Work"]')
        self.browser.find_element_by_xpath('//*[text()="Volunteering"]')
        self.browser.find_element_by_xpath('//*[text()="Awards"]')

    def test_cv_login(self):
        # The site creator navigates to the cv
        self.browser.get(self.live_server_url + '/cv')

        # The site creator is able to view the cv without logging in
        with self.assertRaises(NoSuchElementException):
            self.browser.find_element_by_name("username")
        with self.assertRaises(NoSuchElementException):
            self.browser.find_element_by_name("password")

        # The creator goes to the cv editor
        self.browser.get(self.live_server_url + '/cv/edit')

        # The creator is prompted to login now
        username = self.browser.find_element_by_name("username")
        password = self.browser.find_element_by_name("password")
        submit = self.browser.find_element_by_xpath('//button[text()="Submit"]')

        # The creator logs in
        username.send_keys("admin")
        password.send_keys("admin")
        submit.click()

        time.sleep(1)

        # The login prompt disappears
        with self.assertRaises(NoSuchElementException):
            self.browser.find_element_by_name("username")
        with self.assertRaises(NoSuchElementException):
            self.browser.find_element_by_name("password")

    def test_add_education(self):
        # The site creator is already logged in
        self.browser.get(self.live_server_url + '/cv')
        self.browser.execute_script(f"window.localStorage.setItem('token', '\"{self.token}\"');");

        # The site creator navigates to the post creation page
        self.browser.get(self.live_server_url + '/cv/edit')

        # The site creator finds the education section
        title = self.browser.find_element_by_xpath('//*[text()="Education"]')
        section = title.parent

        # The site creator sees nowhere to fill in a form
        with self.assertRaises(NoSuchElementException):
            section.find_element_by_tag_name("form")

        # The site creator clicks the new education button
        self.browser.find_element_by_xpath('//*[contains(text(), "New")]').click()

        # The site creator is prompted to enter education details
        form = section.find_element_by_tag_name("form")
        qualification = form.find_element_by_name("qualification")
        location = form.find_element_by_name("location")
        icon = form.find_element_by_name("icon")
        start = form.find_element_by_name("start")
        end = form.find_element_by_name("end")
        notes = form.find_element_by_name("notes")
        submit = form.find_element_by_xpath('//button[text()="Submit"]')

        # The site creator creates a new education item
        qualification.send_keys("Sample qualification")
        location.send_keys("Sample location")
        icon.send_keys("fa fa-university")
        start.send_keys("2018")
        end.send_keys("2021")
        notes.send_keys("First note\nSecond note")
        submit.click()

        # The creator navigates back to the main cv
        self.browser.get(self.live_server_url + '/cv')

        # The creator can see their education item
        self.browser.find_element_by_xpath('//*[contains(text(), "Sample qualification")]')
        self.browser.find_element_by_xpath('//*[contains(text(), "Sample location")]')
        self.browser.find_element_by_xpath('//*[text()="2018"]')
        self.browser.find_element_by_xpath('//*[text()="2021"]')
        self.browser.find_element_by_xpath('//*[text()="First note"]')
        self.browser.find_element_by_xpath('//*[text()="Second note"]')

    def test_delete_education(self):
        # There is already an education object
        Education.objects.create(
            qualification="Sample qualification",
            location="Sample location",
            icon="fa fa-university",
            start="2018",
            end="2021",
            notes="First note\nSecond note",
        )

        # The site creator is already logged in
        self.browser.get(self.live_server_url + '/cv')
        self.browser.execute_script(f"window.localStorage.setItem('token', '\"{self.token}\"');");

        # The site creator goes to the cv edit page
        self.browser.get(self.live_server_url + '/cv/edit')

        # The site creator navigates to the education section
        title = self.browser.find_element_by_xpath('//*[text()="Education"]')
        section = title.parent
        form = section.find_element_by_tag_name("form")

        # The creator clicks the delete button
        delete = form.find_element_by_xpath('//*[contains(text(), "Delete")]')
        delete.click()

        # The form disappears
        with self.assertRaises(NoSuchElementException):
            section.find_element_by_tag_name("form")

        # The user navigates back to the cv page
        self.browser.get(self.live_server_url + '/cv')

        # The education item is now gone
        with self.assertRaises(NoSuchElementException):
            self.browser.find_element_by_xpath('//*[contains(text(), "Sample qualification")]')

    def test_edit_education(self):
        # There is already an education object
        Education.objects.create(
            qualification="Sample qualification",
            location="Sample location",
            icon="fa fa-university",
            start="2018",
            end="2021",
            notes="First note\nSecond note",
        )

        # The site creator is already logged in
        self.browser.get(self.live_server_url + '/cv')
        self.browser.execute_script(f"window.localStorage.setItem('token', '\"{self.token}\"');");

        # The site creator goes to the cv edit page
        self.browser.get(self.live_server_url + '/cv/edit')

        # The site creator navigates to the education section
        title = self.browser.find_element_by_xpath('//*[text()="Education"]')
        section = title.parent
        form = section.find_element_by_tag_name("form")

        # The creator modifies the qualification field
        qualification = form.find_element_by_name("qualification")
        qualification.clear()
        qualification.send_keys("A very different qualification")

        # The creator clicks the submit button
        submit = form.find_element_by_xpath('//*[contains(text(), "Submit")]')
        submit.click()

        # The user navigates back to the cv page
        self.browser.get(self.live_server_url + '/cv')

        # The original qualification item is now gone
        with self.assertRaises(NoSuchElementException):
            self.browser.find_element_by_xpath('//*[contains(text(), "Sample qualification")]')

        # But, it's been replaced by the new one
        self.browser.find_element_by_xpath('//*[contains(text(), "A very different qualification")]')
