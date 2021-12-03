export default [
  {
    type: "details",
    object: "block",
    nodes: [
      {
        type: "paragraph",
        object: "block",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                text: "organization details"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    type: "roles",
    object: "block",
    nodes: [
      {
        object: "block",
        type: "job",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                text: "Job Description"
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "from",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                text: "From"
              }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "to",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                text: "To"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    type: "paragraph",
    object: "block",
    nodes: [
      {
        object: "text",
        leaves: [
          {
            text: "Role para"
          }
        ]
      }
    ]
  }
];

export const roles = {
  type: "roles",
  object: "block",
  nodes: [
    {
      object: "block",
      type: "job",
      nodes: [
        {
          object: "text",
          leaves: [
            {
              text: "Job Description"
            }
          ]
        }
      ]
    },
    {
      object: "block",
      type: "from",
      nodes: [
        {
          object: "text",
          leaves: [
            {
              text: "From"
            }
          ]
        }
      ]
    },
    {
      object: "block",
      type: "to",
      nodes: [
        {
          object: "text",
          leaves: [
            {
              text: "To"
            }
          ]
        }
      ]
    }
  ]
};

export const para = {
  type: "paragraph",
  object: "block",
  nodes: [
    {
      object: "text",
      leaves: [
        {
          text: "Role para"
        }
      ]
    }
  ]
};
