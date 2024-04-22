import unittest
from unittest.mock import patch
from backend.app.designPatterns.BridgePattern.bridge import Device, Light, Fan  # Replace with the actual module name

class TestBridgePattern(unittest.TestCase):
    def test_light_turn_on(self):
        light = Light()
        device = Device(light)
        with patch('builtins.print') as mocked_print:
            device.turn_on()
            mocked_print.assert_called_with("Light turned on")
