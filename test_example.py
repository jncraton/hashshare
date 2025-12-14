import re
from playwright.sync_api import Page, expect
import pytest

from pathlib import Path

file_url = Path("example.html").resolve().as_uri()

@pytest.fixture
def root(page: Page):
    page.goto(f"{file_url}#")
    return page

def test_page_title(root):
    expect(root).to_have_title("Pastebin Example")

def test_page_content(page: Page):
    page.goto(f"{file_url}#eyJ0ZXh0IjoiSGVsbG8sIHdvcmxkIn0=")
    expect(page.locator('textarea')).to_have_value("Hello, world")

def test_page_content_deflate(page: Page):
    page.goto(f"{file_url}#;q1YqSa0oUbJS8kjNycnXUSjPL8pJUaoFAA==")
    expect(page.locator('textarea')).to_have_value("Hello, world")

def test_page_url(root):
    root.locator('textarea').fill('Hello, world')
    expect(root).to_have_url(re.compile(".*eyJ0ZXh0IjoiSGVsbG8sIHdvcmxkIn0="))
