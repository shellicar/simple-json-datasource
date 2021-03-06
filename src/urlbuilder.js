

export class UrlBuilder {

    constructor(baseUrl, apikey, sensorid) {
        this.baseUrl = baseUrl;
        this.apikey = apikey;
        this.sensorid = sensorid;
    }

    buildQueryUrl(targets) {
        var arr = [];

        var streamid = null;
        if (targets) {
            streamid = targets.map(x => x.target).join(",");
        }

        console.info('streamid');
        console.info(streamid);

        if (!streamid)
            streamid = this.sensorid;

        if (streamid) {
            console.info('streamid=' + streamid);
            arr.push('id=' + streamid);
        }

        arr.push('limit=10000');
        arr.push('properties=resulttype');

        // only request scalars
        //arr.push('resulttype=scalarvalue');

        // api url
        var url = this.buildUrl("/streams", arr);

        console.info("URL=" + url);
        return url;
    }

    buildUrl(str, arr) {
        var baseUrl = this.baseUrl;
        var url = baseUrl + str;

        var opt = [];

        if (this.apikey != "")
            opt.push('apikey=' + this.apikey);

        if (arr) {
            for (var i = 0; i < arr.length; ++i)
                opt.push(arr[i]);
        }

        if (opt.length > 0) {
            var query = opt.join('&');
            url += '?' + query
        }

        console.info('url: ' + url);
        return url;
    }
}
