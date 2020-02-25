const rules = {
  rules: [
    {
      ruleName: "Sample Flat Payout Rule",
      ruleId: 123,
      next: {
        type: "GROUP_CHECK",
        groupId: "45d99621-f10c-11e9-8076-e23a3b935e07",
        next: {
          type: "DATE_CHECK",
          afterDate: "2019-01-10T19:11:00.000Z",
          beforeDate: "2020-01-10T20:30:00.000Z",
          next: {
            type: "PRODUCT_ID_CHECK",
            products: [1, 3, 67, 83, 29],
            next: {
              type: "ACCUMULATOR",
              count: 2,
              next: {
                type: "PAYOUT",
                amount: 32
              }
            }
          }
        }
      }
    },
    {
      ruleName: "Sample Spark Rule",
      ruleId: 666,
      next: {
        type: "GROUP_CHECK",
        groupId: "45d99621-f10c-11e9-8076-e23a3c986g83",
        next: {
          type: "DATE_CHECK",
          afterDate: "2020-01-15T19:11:00.000Z",
          beforeDate: "2020-02-15T01:30:00.000Z",
          next: {
            type: "PRODUCT_ID_CHECK",
            products: [1, 3, 67, 83, 29],
            next: {
              type: "LEARNING_CHECK",
              courseId: 87,
              next: {
                type: "OCCURRENCE",
                times: ["2020-02-15T01:30:00.000Z"],
                next: {
                  type: "RANKING",
                  topNum: 10,
                  next: {
                    type: "PAYOUT",
                    amount: 200
                  }
                }
              }
            }
          }
        }
      }
    }
  ]
};
