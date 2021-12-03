export default {
  inlines: {
    span: {
      isVoid: true
    }
  },
  blocks: {
    we: {
      nodes: [
        {
          match: [{ type: "details" }, { type: "roles" }, { type: "paragraph" }]
        }
      ]
    },
    roles: {
      nodes: [
        {
          match: [{ type: "job" }, { type: "from" }, { type: "to" }]
        }
      ]
    },
    job: {
      nodes: [
        {
          match: { object: "text" }
        }
      ]
    },
    from: {
      nodes: [
        {
          match: { object: "text" }
        }
      ]
    },
    to: {
      nodes: [
        {
          match: { object: "text" }
        }
      ]
    }
    /**
     * TRIAL 1
     */
    // drag: {
    //   nodes: [
    //     {
    //       match: [{ type: "we" }, { type: "paragraph" }]
    //     }
    //   ]
    // }
  }
};
