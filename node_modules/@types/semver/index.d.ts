// Type definitions for semver 7.3
// Project: https://github.com/npm/node-semver
// Definitions by: Bart van der Schoor <https://github.com/Bartvds>
//                 BendingBender <https://github.com/BendingBender>
//                 Lucian Buzzo <https://github.com/LucianBuzzo>
//                 Klaus Meinhardt <https://github.com/ajafff>
//                 ExE Boss <https://github.com/ExE-Boss>
//                 Piotr Błażejewicz <https://github.com/peterblazejewicz>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

// re-exports for index file

// functions for working with versions
import semverParse = require('semver/functions/parse');
import semverValid = require('semver/functions/valid');
import semverClean = require('semver/functions/clean');
import semverInc = require('semver/functions/inc');
import semverDiff = require('semver/functions/diff');
import semverMajor = require('semver/functions/major');
import semverMinor = require('semver/functions/minor');
import semverPatch = require('semver/functions/patch');
import semverPrerelease = require('semver/functions/prerelease');
import semverCompare = require('semver/functions/compare');
import semverRcompare = require('semver/functions/rcompare');
import semverCompareLoose = require('semver/functions/compare-loose');
import semverCompareBuild = require('semver/functions/compare-build');
import semverSort = require('semver/functions/sort');
import semverRsort = require('semver/functions/rsort');

export {
    semverParse as parse,
    semverValid as valid,
    semverClean as clean,
    semverInc as inc,
    semverDiff as diff,
    semverMajor as major,
    semverMinor as minor,
    semverPatch as patch,
    semverPrerelease as prerelease,
    semverCompare as compare,
    semverRcompare as rcompare,
    semverCompareLoose as compareLoose,
    semverCompareBuild as compareBuild,
    semverSort as sort,
    semverRsort as rsort,
};

// low-level comparators between versions
import semverGt = require('semver/functions/gt');
import semverLt = require('semver/functions/lt');
import semverEq = require('semver/functions/eq');
import semverNeq = require('semver/functions/neq');
import semverGte = require('semver/functions/gte');
import semverLte = require('semver/functions/lte');
import semverCmp = require('semver/functions/cmp');
import semverCoerce = require('semver/functions/coerce');

export {
    semverGt as gt,
    semverLt as lt,
    semverEq as eq,
    semverNeq as neq,
    semverGte as gte,
    semverLte as lte,
    semverCmp as cmp,
    semverCoerce as coerce,
};

// working with ranges
import semverSatisfies = require('semver/functions/satisfies');
import semverMaxSatisfying = require('semver/ranges/max-satisfying');
import semverMinSatisfying = require('semver/ranges/min-satisfying');
import semverToComparators = require('semver/ranges/to-comparators');
import semverMinVersion = require('semver/ranges/min-version');
import semverValidRange = require('semver/ranges/valid');
import semverOutside = require('semver/ranges/outside');
import semverGtr = require('semver/ranges/gtr');
import semverLtr = require('semver/ranges/ltr');
import semverIntersects = require('semver/ranges/intersects');
import simplify = require('semver/ranges/simplify');
import rangeSubset = require('semver/ranges/subset');

export {
    semverSatisfies as satisfies,
    semverMaxSatisfying as maxSatisfying,
    semverMinSatisfying as minSatisfying,
    semverToComparators as toComparators,
    semverMinVersion as minVersion,
    semverValidRange as validRange,
    semverOutside as outside,
    semverGtr as gtr,
    semverLtr as ltr,
    semverIntersects as intersects,
    simplify as simplifyRange,
    rangeSubset as subset,
};

// classes
import SemVer = require('semver/classes/semver');
import Range = require('semver/classes/range');
import Comparator = require('semver/classes/comparator');

export { SemVer, Range, Comparator };

// internals
import identifiers = require('semver/internals/identifiers');
export import compareIdentifiers = identifiers.compareIdentifiers;
export import rcompareIdentifiers = identifiers.rcompareIdentifiers;

export const SEMVER_SPEC_VERSION: '2.0.0';

export type ReleaseType = 'major' | 'premajor' | 'minor' | 'preminor' | 'patch' | 'prepatch' | 'prerelease';

export interface Options {
    loose?: boolean | undefined;
}

export interface RangeOptions extends Options {
    includePrerelease?: boolean | undefined;
}
export interface CoerceOptions extends Options {
    /**
     * Used by `coerce()` to coerce from right to left.
     *
     * @default false
     *
     * @example
     * coerce('1.2.3.4', { rtl: true });
     * // => SemVer { version: '2.3.4', ... }
     *
     * @since 6.2.0
     */
    rtl?: boolean | undefined;
}

export type Operator = '===' | '!==' | '' | '=' | '==' | '!=' | '>' | '>=' | '<' | '<=';
