Feature: Scenario outline test
  Scenario Outline: Compute <a> and <b>
    Given there is <a> and <b>
    When they are added
    Then result should be equal <result>

    Examples:
    | a| b| result|
    | 1| 2|      3|
    | 2| 4|      7|