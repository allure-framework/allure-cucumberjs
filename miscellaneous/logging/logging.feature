Feature: Logging tests
  Scenario: Logging test
    Given I log 3 messages
    When I log 2 messages
    Then I log 5 messages