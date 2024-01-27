'use strict';

// external imports

// internal imports

// implementation
const prefixTreeWord1 = 'abound';
const prefixTreeWord2 = 'abundant';
const prefixTreeWord3 = 'ace';
const prefixTreeWord4 = 'achieve';
const prefixTreeWord5 = 'amiable';
const prefixTreeWord6 = 'amicable';

const genericTreeData1 = {
    value: null,
    children: [
        {
            value: 'a',
            children: [
                {
                    value: 'b',
                    children: [
                        {
                            value: 'o',
                            children: [
                                {
                                    value: 'u',
                                    children: [
                                        {
                                            value: 'n',
                                            children: [
                                                {
                                                    value: 'd',
                                                    children: []
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            value: 'u',
                            children: [
                                {
                                    value: 'n',
                                    children: [
                                        {
                                            value: 'd',
                                            children: [
                                                {
                                                    value: 'a',
                                                    children: [
                                                        {
                                                            value: 'n',
                                                            children: [
                                                                {
                                                                    value: 't',
                                                                    children: [],
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    value: 'c',
                    children: [
                        {
                            value: 'e',
                            children: [],
                        },
                        {
                            value: 'h',
                            children: [
                                {
                                    value: 'i',
                                    children: [
                                        {
                                            value: 'e',
                                            children: [
                                                {
                                                    value: 'v',
                                                    children: [
                                                        {
                                                            value: 'e',
                                                            children: [],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    value: 'm',
                    children: [
                        {
                            value: 'i',
                            children: [
                                {
                                    value: 'a',
                                    children: [
                                        {
                                            value: 'b',
                                            children: [
                                                {
                                                    value: 'l',
                                                    children: [
                                                        {
                                                            value: 'e',
                                                            children: [],
                                                        }
                                                    ],
                                                }
                                            ],
                                        }
                                    ],
                                },
                                {
                                    value: 'c',
                                    children: [
                                        {
                                            value: 'a',
                                            children: [
                                                {
                                                    value: 'b',
                                                    children: [
                                                        {
                                                            value: 'l',
                                                            children: [
                                                                {
                                                                    value: 'e',
                                                                    children: [],
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};

// exports
export {
    prefixTreeWord1,
    prefixTreeWord2,
    prefixTreeWord3,
    prefixTreeWord4,
    prefixTreeWord5,
    prefixTreeWord6,

    genericTreeData1,
}