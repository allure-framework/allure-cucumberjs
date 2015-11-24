Feature: Basic tests
  Scenario: Passed test
    Given given step
    When when step
    Then passed step

  Scenario: Passed test with undefined
    Given given step
    When when step
    Then passed step
    And undefined step

  Scenario: Passed test with pending
    Given given step
    When when step
    Then passed step
    And pending step

  Scenario: Failed test
    Given given step
    When when step
    Then failed step

  Scenario: Failed test with skipped
    Given given step
    When when step
    Then failed step
    And skipped step

  Scenario: Failed test with undefined
    Given given step
    When when step
    Then failed step
    And undefined step

  Scenario: Failed test with skipped and undefined
    Given given step
    When when step
    Then failed step
    And skipped step
    And undefined step