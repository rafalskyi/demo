/*
 * ******* COMMON PROPERTIES ******
 *
 * - id: string. identifiers of the steps: 'interactionTypeCondition'... etc.
 * - component: enum string: 'DefaultComponent', 'FieldInputComponent', 'RelationshipComponent' ...etc (TODO: provide full list of available components)
 * - options: [{label, value}]
 * - fetchOptions:
 *     false |
 *     {
 *        endpoint: string,   '/api/client/{{stepId}}/' - can be dynamic if we need it. take value from stepId
 *        parameters: ''
 *     }
 * - select: all possible select properties (TODO: provide full list of available components) styles ,placeholder ,value
 * - next: [{optionValue, nextFilter: [str, str]}, {optionValue, nextFilter: [str]}... ]
 *     (Array of the objects of the steps that should come after this one)
 * - payloadTemplate: "{djjkasdjadaskd{{874823}}}" - {{ mustache }} or ay other idea for payload templater ?
 *
 * all values we can take from prev step selections by id.
 * 1. can we consider stepId is objectKey and selected value is stepValue for request payload?
 *   {
 *     step1: value1, - any data type
 *     step2: value2,
 *     step3: value3,
 *     step3: value3,
 *     step3: value3,
 *     step3: value3,
 *     step3: value3,
 *   }
 *
 * --------------------------------------------------------------------------------------------------------------------
 *
 * */

// example on form filter:
// filterDataObject - the object we build dynamically from user filter selection
const filterDataObject = {
  filterType: 'forms_v2',
  meta: {
    fieldId: {}, // whole field object here;
  },
  formId: ['01dde087-4ad4-45b3-a297-61c2b796c328'],
  submittedCondition: 'submitted_any_time',
  nDaysValue: 'null',
  submission: 'with_specific_answer',
  fieldId: '385cc20b-3885-4d96-a3bd-e18cfcb92a1d',
  emailCondition: 'equals', // this key can be different and depends on field selection
  emailValue: 'test@email.com', // this key can be different and depends on field selection
};

const filterRaw = [
  {
    id: 'filterType',
    component: 'DefaultComponent',
    dataQA: { id: 'filterType', type: 'dropdown' },
    fetchOptions: false,
    select: {
      placeholder: '',
      styles: {
        container: { width: '210px' },
      },
      options: [
        { label: 'Forms', value: 'forms_v2' },
        { label: 'Automations', value: 'automation2' },
        { label: 'Commerce', value: 'commerce' },
        // .... long list of available filter
      ],
      value: 'forms_v2',
    },
    next: [
      { optionValue: 'forms_v2', nextFilter: ['formId'] },
      { optionValue: 'automation2', nextFilter: ['automationId'] },
      {
        optionValue: 'commerce',
        nextFilter: ['commerceSubtype', 'productIds'],
      },
      // .... long list of next possible options
    ],
    //payloadTemplate: '', // mustache json template or any other template for dynamic replace from filterDataObject - maybe it will be only in last element only
  },
  {
    id: 'formId',
    component: 'DefaultComponent',
    dataQA: { id: 'formId', type: 'dropdown' },
    fetchOptions: {
      method: 'GET',
      endpoint:
        '/api/forms?related_object_id=01dde087-4ad4-45b3-a297-61c2b796c328&ordering=name',
      parameters: {},
      fetchAll: true, // paginate through all pages
    },
    select: {
      placeholder: 'Choose Form',
      styles: {
        container: { width: '250px' },
      },
      options: [],
      value: '',
    },
    validate: { error: false, errorMessage: 'Required field' },
    next: [
      {
        optionValue: '34a6c996-0226-4e0f-b911-bcdc8ced4a62',
        nextFilter: ['submittedCondition', 'submission'],
      },
      {
        optionValue: 'eed621c6-5168-4219-8933-5b4d56f62020',
        nextFilter: ['submittedCondition', 'submission'],
      },
      {
        optionValue: '35f616ba-a2c1-4434-b3f8-b9937dfbae7f',
        nextFilter: ['submittedCondition', 'submission'],
      },
      {
        optionValue: 'e9fd972d-0e81-4abd-95bc-1f6ff29755e0',
        nextFilter: ['submittedCondition', 'submission'],
      },
      {
        optionValue: 'ef3081e3-ed8e-4e17-8732-6a5ec1d1b74b',
        nextFilter: ['submittedCondition', 'submission'],
      },
      // .... long list of next possible options for all forms
    ],
    payloadTemplate: '', // mustache json template or any other template for dynamic replace from filterDataObject
  },
  {
    id: 'submittedCondition',
    component: 'DefaultComponent',
    dataQA: { id: 'submittedCondition', type: 'dropdown' },
    fetchOptions: false,
    select: {
      placeholder: '',
      styles: {
        container: { width: '210px' },
      },
      options: [
        {
          value: 'submitted_any_time',
          label: 'Any Time In The Past',
        },
        {
          value: 'submitted_past_n_days',
          label: 'Submitted In Past # Days',
        },
        {
          value: 'submitted_not_past_n_days',
          label: 'Not Submitted In Past # Days',
        },
        {
          value: 'never_submitted',
          label: 'Never Submitted',
        },
      ],
      value: 'submitted_any_time',
    },
    validate: false,
    next: [
      { optionValue: 'submitted_any_time', nextFilter: ['submission'] },
      {
        optionValue: 'submitted_past_n_days',
        nextFilter: ['nDaysValue', 'submission'],
      },
      {
        optionValue: 'submitted_not_past_n_days',
        nextFilter: ['nDaysValue', 'submission'],
      },
      { optionValue: 'never_submitted', nextFilter: ['submission'] },
      // .... long list of next possible options
    ],
    //payloadTemplate: '', // mustache json template or any other template for dynamic replace from filterDataObject - maybe it will be only in last element only
  },
  {
    id: 'nDaysValue',
    component: 'FieldInputComponent',
    field: { fieldType: 'integer', access: { edit: true } },
    className: 'width-60',
    placeholder: '0',
    value: '',
    select: { value: undefined },
    validate: { error: false, errorMessage: 'Required field' },
    next: [],
    //payloadTemplate: '', // mustache json template or any other template for dynamic replace from filterDataObject - maybe it will be only in last element only
  },
  {
    id: 'submission',
    component: 'DefaultComponent',
    dataQA: { id: 'submission', type: 'dropdown' },
    fetchOptions: false,
    select: {
      affix: 'with submission result',
      placeholder: '',
      styles: {
        container: { width: '210px' },
      },
      options: [
        { label: 'Any Answer', value: 'null' },
        { label: 'Specific Answer', value: 'with_specific_answer' },
      ],
      value: '',
    },
    validate: false,
    next: [
      { optionValue: 'null', nextFilter: [] },
      { optionValue: 'with_specific_answer', nextFilter: ['fieldId'] },
    ],
    payloadTemplate: '', // mustache json template or any other template for dynamic replace from filterDataObject - maybe it will be only in last element only
  },
  {
    id: 'fieldId',
    component: 'DefaultComponent',
    dataQA: { id: 'fieldId', type: 'dropdown' },
    fetchOptions: false,
    select: {
      affix: 'answer',
      placeholder: 'Choose Answer',
      styles: {
        container: { width: '250px' },
      },
      options: [],
      value: '',
    },
    validate: { error: false, errorMessage: 'Required field' },
    next: [
      {
        optionValue: '385cc20b-3885-4d96-a3bd-e18cfcb92a1d',
        nextFilter: ['emailConditions'],
      },
      {
        optionValue: '185cc20b-3885-4d96-a3bd-e18cfcb92a1d',
        nextFilter: ['checkboxesConditions'],
      },
      ////........
    ],
    //payloadTemplate: '', // mustache json template or any other template for dynamic replace from filterDataObject - maybe it will be only in last element only
  },
  {
    id: 'emailConditions',
    component: 'DefaultComponent',
    dataQA: { id: 'emailConditions', type: 'dropdown' },
    select: {
      placeholder: 'Choose Condition',
      styles: {
        container: { width: '180px' },
      },
      options: [
        {
          label: 'Equals',
          value: 'equals',
        },
        {
          label: 'Does Not Equal',
          value: 'does_not_equal',
        },
        {
          label: 'Contains',
          value: 'contains',
        },
        {
          label: 'Does Not Contain',
          value: 'does_not_contain',
        },
        {
          label: 'Starts With',
          value: 'starts_with',
        },
        {
          label: 'Ends With',
          value: 'ends_with',
        },
        {
          label: "Doesn't Start With",
          value: 'does_not_start_with',
        },
        {
          label: "Doesn't End With",
          value: 'does_not_end_with',
        },
        {
          label: 'Is Blank',
          value: 'is_blank',
        },
        {
          label: "Isn't Blank",
          value: 'is_not_blank',
        },
      ],
      value: '',
    },
    validate: { error: false, errorMessage: 'Required field' },
    next: [
      {
        optionValue: 'equals',
        nextFilter: ['emailValue'],
      },
      {
        optionValue: 'does_not_equal',
        nextFilter: ['emailValue'],
      },
      {
        optionValue: 'contains',
        nextFilter: ['textValue'],
      },
      {
        optionValue: 'does_not_contain',
        nextFilter: ['textValue'],
      },
      {
        optionValue: 'starts_with',
        nextFilter: ['textValue'],
      },
      {
        optionValue: 'ends_with',
        nextFilter: ['textValue'],
      },
      {
        optionValue: 'does_not_start_with',
        nextFilter: ['textValue'],
      },
      {
        optionValue: 'does_not_end_with',
        nextFilter: ['textValue'],
      },
      {
        optionValue: 'is_blank',
        nextFilter: [],
      },
      {
        optionValue: 'is_not_blank',
        nextFilter: [],
      },
    ],
    payloadTemplate: '', // mustache json template or any other template for dynamic replace from filterDataObject - maybe it will be only in last element only
  },
  {
    id: 'checkboxesConditions',
    component: 'DefaultComponent',
    dataQA: { id: 'checkboxesConditions', type: 'dropdown' },
    select: {
      placeholder: 'Choose Condition',
      styles: {
        container: { width: '180px' },
      },
      options: [
        {
          label: 'Contains',
          value: 'contains_has',
        },
        {
          label: 'Does Not Contain',
          value: 'does_not_contain_has',
        },
        {
          label: 'Is Blank',
          value: 'is_blank',
        },
        {
          label: "Isn't Blank",
          value: 'is_not_blank',
        },
        {
          label: 'Contains Any Of',
          value: 'has_any',
        },
        {
          label: 'Contains None Of',
          value: '!has_any',
        },
      ],
      value: '',
    },
    validate: { error: false, errorMessage: 'Required field' },
    next: [
      {
        optionValue: 'contains_has',
        nextFilter: ['checkboxesSingleValue'],
      },
      {
        optionValue: 'does_not_contain_has',
        nextFilter: ['checkboxesSingleValue'],
      },
      {
        optionValue: 'is_blank',
        nextFilter: [],
      },
      {
        optionValue: 'is_not_blank',
        nextFilter: [],
      },
      {
        optionValue: 'has_any',
        nextFilter: ['checkboxesMultiValue'],
      },
      {
        optionValue: '!has_any',
        nextFilter: ['checkboxesMultiValue'],
      },
    ],
    payloadTemplate: '', // mustache json template or any other template for dynamic replace from filterDataObject - maybe it will be only in last element only
  },
  {
    id: 'checkboxConditions',
    component: 'DefaultComponent',
    dataQA: { id: 'condition', type: 'dropdown' },
    select: {
      placeholder: 'Choose Condition',
      styles: {
        container: { width: '180px' },
      },
      options: [
        { label: 'Is Checked', value: 'is_checked' },
        { label: "Isn't Checked", value: 'is_not_checked' },
      ],
      value: '',
    },
    validate: { error: false, errorMessage: 'Required field' },
    next: [],
    payloadTemplate: '', // mustache json template or any other template for dynamic replace from filterDataObject - maybe it will be only in last element only
  },
  ////..........
  {
    id: 'email-value',
    component: 'DefaultComponent',
    dataQA: { id: 'condition', type: 'dropdown' },
    select: {
      placeholder: 'Choose Condition',
      styles: {
        container: { width: '180px' },
      },
      options: [{ option1 }, { option1 }],
      value: '',
    },
    validate: { error: false, errorMessage: 'Required field' },
    next: [],
    payloadTemplate: '', // mustache json template or any other template for dynamic replace from filterDataObject - maybe it will be only in last element only
  },
  {
    id: 'checkbox-value',
    component: 'DefaultComponent',
    dataQA: { id: 'condition', type: 'dropdown' },
    select: {
      placeholder: 'Choose Condition',
      styles: {
        container: { width: '180px' },
      },
      options: [{ option1 }, { option1 }],
      value: '',
    },
    validate: { error: false, errorMessage: 'Required field' },
    next: [],
    payloadTemplate: '', // mustache json template or any other template for dynamic replace from filterDataObject - maybe it will be only in last element only
  },
];
