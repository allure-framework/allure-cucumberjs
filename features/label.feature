@feature:FeatureLabel
Feature: Labels tests
  @story:ScenarioLabel
  Scenario: Scenario label test
    Given given step
    When when step
    Then passed step

  @severity:critical
  Scenario: Severity label test
    Given given step
    When when step
    Then passed step

  @language:english
  Scenario: Language label test
    Given given step
    When when step
    Then passed step

  @framework:cucumber
  Scenario: Framework label test
    Given given step
    When when step
    Then passed step

  @issue:1234 @issue:Bug#12
  Scenario: Issue label test
    Given given step
    When when step
    Then passed step

  @testId:2345
  Scenario: TestId label test
    Given given step
    When when step
    Then passed step

  @host:HostLabel
  Scenario: Host label test
    Given given step
    When when step
    Then passed step

  @thread:ThreadLabel
  Scenario: Thread label test
    Given given step
    When when step
    Then passed step