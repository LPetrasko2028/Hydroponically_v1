
class TestService {
    constructor(couchdbUrl = 'http://localhost:5984', dbName = 'test') {
        this.baseUrl = couchdbUrl;
        this.dbName = dbName;
        this.db = {db: dbName};
    }
}

export default TestService;