export function myUtil() {
    (<any>this.SYSTEM_CONFIG_DEV.paths)['angularfire2'] =
        '${this.APP_BASE}node_modules/angularfire2/';
};
