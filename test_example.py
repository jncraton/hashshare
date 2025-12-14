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
