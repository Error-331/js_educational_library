// external imports

// internal imports

// implementation
const testNumericSegmentsArray1 = [
    [10, 20],
    [20, 30],
    [30, 40],
    [110, 120],
    [40, 50],
    [50, 60],
    [5, 15],
    [20, 40],
    [5, 70],
    [35, 45],
    [80, 100],
];

const testNumericSegmentsArray2 = [
    [110, 120],
    [80, 100],
    [50, 60],
    [40, 50],
    [35, 45],
    [30, 40],
    [20, 40],
    [20, 30],
    [10, 20],
    [5, 70],
    [5, 15],
];

const testNumericSegmentsArray3 = [
    [10, 19],
    [20, 29],
    [30, 39],
    [110, 120],
    [40, 49],
    [50, 59],
    [5, 15],
    [80, 100],
];

const testNumericSegmentsArray4 = [
    [250, 350],
    [300, 320],
    [330, 350],
    [400, 430],
    [450, 490],
    [480, 500],
    [400, 500],
    [500, 520],
    [500, 630],
    [620, 780],
    [700, 920],
    [720, 1020],
    [720, 880],
    [850, 930],
    [860, 1020],
    [2300, 2500],
    [2500, 2600],
    [2600, 2680],
    [4900, 6000],
    [5100, 5300],
    [5700, 5900],
]

const testNumericSegmentsMergeResultArray1 = [
    [ 5, 70 ],
    [ 80, 100 ],
    [ 110, 120 ],
];

const testNumericSegmentsMergeResultArray2 = [
    [ 5, 70 ],
    [ 80, 100 ],
    [ 110, 120 ],
];

const testNumericSegmentsMergeResultArray3 = [
    [5, 19],
    [20, 29],
    [30, 39],
    [40, 49],
    [50, 59],
    [80, 100],
    [110, 120],
];

const testNumericSegmentsMergeResultArray4 = [
    [250, 350],
    [400, 1020],
    [2300, 2680],
    [4900, 6000],
];

// exports
export {
    testNumericSegmentsArray1,
    testNumericSegmentsArray2,
    testNumericSegmentsArray3,
    testNumericSegmentsArray4,

    testNumericSegmentsMergeResultArray1,
    testNumericSegmentsMergeResultArray2,
    testNumericSegmentsMergeResultArray3,
    testNumericSegmentsMergeResultArray4,
}
