@sprint-1
  Feature: Custom tag names
    @bug-1234
    Scenario: Custom tag: bug -> issue
      Given given step

    @issue:666
    Scenario: Built in tag: issue
      Given given step

    @unknownTag123
    Scenario: Unknown tag
      Given given step