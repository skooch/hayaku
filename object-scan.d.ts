/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "object-scan" {
    type Needles = string[];
  
    interface CallbackArgs {
      /** key that callback is invoked for (respects joined option). */
      key: string | number;
      /** value for key. */
      value: any;
      /** entry consisting of [key, value]. */
      entry: any;
      /** current parent property. */
      property: any;
      /** current grandparent property. */
      gproperty: any;
      /** current parent. */
      parent: any;
      /** current grandparent. */
      gparent: any;
      /** array of form [parent, grandparent, ...]. */
      parents: any;
      /** true iff last targeting needle exists and is non-excluding. */
      isMatch: any;
      /** all non-excluding needles targeting key. */
      matchedBy: any;
      /** all excluding needles targeting key. */
      excludedBy: any;
      /** all needles involved in traversing key. */
      traversedBy: any;
      /** true iff value contained in parents */
      isCircular: any;
      /** true iff value can not be traversed */
      isLeaf: any;
      /** length of key */
      depth: any;
      /** intermittent result as defined by rtn */
      result: any;
      /** joined?: boolean): function that returns key */
      getKey: any;
      /** function that returns value */
      getValue: any;
      /** joined?: boolean): function that returns entry */
      getEntry: any;
      /** function that returns property */
      getProperty: any;
      /** function that returns gproperty */
      getGproperty: any;
      /** function that returns parent */
      getParent: any;
      /** function that returns gparent */
      getGparent: any;
      /** function that returns parents */
      getParents: any;
      /** function that returns isMatch */
      getIsMatch: any;
      /** function that returns matchedBy */
      getMatchedBy: any;
      /** function that returns excludedBy */
      getExcludedBy: any;
      /** function that returns traversedBy */
      getTraversedBy: any;
      /** function that returns isCircular */
      getIsCircular: any;
      /** function that returns isLeaf */
      getIsLeaf: any;
      /** function that returns depth */
      getDepth: any;
      /** function that returns result */
      getResult: any;
      /** as passed into the search */
      context: any;
    }
  
    type OptionFunction = (callbackArgs: CallbackArgs) => boolean;
    interface Options {
      joined: boolean;
      rtn: string | string[] | OptionFunction;
      reverse: boolean;
      orderByNeedles: boolean;
      abort: boolean;
      joined: boolean;
      useArraySelector: boolean;
      strict: boolean;
      filterFn: OptionFunction;
      breakFn: OptionFunction;
      beforeFn: OptionFunction;
      afterFn: OptionFunction;
      compareFn: OptionFunction;
    }
  
    type ObjectScan = <TInput, TReturn = unknown>(
      needles: Needles,
      options: Partial<Options>
    ) => (input: TInput) => TReturn;
  
    const objectScan: ObjectScan;
  
    export default objectScan;
  }