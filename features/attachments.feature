Feature: Attachments tests
  Scenario: DataTable test
    Given dataTable:
    | test | test2 |
    | 1    | 2     |
    | 3    | 4     |
    When when step
    Then passed step

  Scenario: DocString test
    Given docString:
      """
      1
      2
      A
      B
      #
      $
      """
    When when step
    Then passed step

  Scenario: DocString and DataTable test
    Given docString:
      """
      Test
      Test-1
      Test-n
      """
    And dataTable:
      | test                 | test2 |
      | thisIsLongerThanRest | !     |
      | 3                    | 4     |
    When when step
    Then passed step