import {curry} from "./src/utils/misc/functional_utils.js";
import {leftSegmentComparator} from "./src/utils/segments/segment_comparator_utils.js";
import {defaultCompare} from "./src/utils/misc/comparator_utils.js";
import {mergeSortSegmentsByLeftSegment} from "./src/algorithms/segments/merge_sort_segments_by_left_segment.js";
import {combineNumericSegments} from "./src/utils/segments/segment_combinators_utils.js";

import bandsJSON from './test.json' with { type: "json" };
import {cloneDeep} from "./src/utils/primitives/object_utils.js";
import fs from 'node:fs';
// tests comments
const generalDronesFrequencies = [
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
    [5700, 5900]
];

const controlDronesFrequencies = [
    [250, 350],
    [320, 420],
    [330, 350],
    [400, 430],
    [450, 490],
    [480, 500],
    [500, 520],
    [900, 1000],
    [1555, 1600],
    [2500, 2600]
];

const videoDronesFrequencies = [
    [460, 600],
    [910, 1360],
    [1075, 1082.5],
    [1100, 1300],
    [1405, 1680],
    [1700, 1900],
    [2290, 2510],
    [3300, 3500],
    [4867, 6184]
];

function prepareBandsFile() {
    const comparator = curry(leftSegmentComparator)(defaultCompare);

    const generalDronesFrequenciesMerged = mergeSortSegmentsByLeftSegment(comparator, combineNumericSegments, generalDronesFrequencies);
    const controlDronesFrequenciesMerged = mergeSortSegmentsByLeftSegment(comparator, combineNumericSegments, controlDronesFrequencies);
    const videoDronesFrequenciesMerged = mergeSortSegmentsByLeftSegment(comparator, combineNumericSegments, videoDronesFrequencies);

    const bandPrototype = {
        "alpha": 255,
        "blue": 0,
        "green": 0,
        "id": 0,
        "labelVisible": true,
        "labelXPos": 0.0,
        "labelYPos": 0.0,
        "level": 0,
        "red": 0,
        "startFrequency": 0,
        "stopFrequency": 0,
        "title": ""
    };

    let startID = bandsJSON.length;
    let bandLabelId = 1;

    const newBands = [];

    for (const frequency of generalDronesFrequenciesMerged) {
        const band = cloneDeep(bandPrototype);

        band.id = startID;
        band.title = `Drone general ${bandLabelId}`;

        band.startFrequency = frequency[0] * 1000000;
        band.stopFrequency = frequency[1] * 1000000;

        band.red = 255;
        band.green = 87
        band.blue = 34

        startID += 1;
        bandLabelId += 1;

        newBands.push(band);
    }

    bandLabelId = 1;
    for (const frequency of controlDronesFrequenciesMerged) {
        const band = cloneDeep(bandPrototype);

        band.id = startID;
        band.title = `Drone control ${bandLabelId}`;

        band.startFrequency = frequency[0] * 1000000;
        band.stopFrequency = frequency[1] * 1000000;

        band.red = 69;
        band.green = 90;
        band.blue = 100;

        startID += 1;
        bandLabelId += 1;

        newBands.push(band);
    }

    bandLabelId = 1;
    for (const frequency of videoDronesFrequenciesMerged) {
        const band = cloneDeep(bandPrototype);

        band.id = startID;
        band.title = `Drone video ${bandLabelId}`;

        band.startFrequency = frequency[0] * 1000000;
        band.stopFrequency = frequency[1] * 1000000;

        band.red = 25;
        band.green = 118;
        band.blue = 210;

        startID += 1;
        bandLabelId += 1;

        newBands.push(band);
    }

    fs.writeFileSync('test_1.json', JSON.stringify(bandsJSON.concat(newBands)));

    /*fs.appendFileSync('test_1.json', '[');
    for (const band of bandsJSON.concat(newBands)) {
        console.log(band);
        fs.appendFileSync('test_1.json', band.toString())
    }
    fs.appendFileSync('test_1.json', ']');*/



}

prepareBandsFile();