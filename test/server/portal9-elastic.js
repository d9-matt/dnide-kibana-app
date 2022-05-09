const chai = require('chai');
const needle = require('needle');
const { PORTAL9_ALERTS_PATTERN } = require('../../common/constants');

const kibanaServer = process.env.KIBANA_IP || 'localhost';

chai.should();

const headers = {
  headers: { 'kbn-xsrf': 'kibana', 'Content-Type': 'application/json' }
};

describe('portal9-elastic', () => {
  describe('Checking index patterns', () => {
    it('GET /elastic/known-fields/{pattern}', async () => {
      const res = await needle(
        'get',
        `${kibanaServer}:5601/elastic/known-fields/${PORTAL9_ALERTS_PATTERN}`,
        {},
        headers
      );
      res.body.acknowledge.should.be.eql(true);
      res.body.output.should.be.a('object');
      //res.body.output._index.should.be.eql('.kibana');
      res.body.output._type.should.be.eql('doc');
      res.body.output._id.should.be.eql(`index-pattern:${PORTAL9_ALERTS_PATTERN}`);
    });
  });

  describe('Checking visualization composers', () => {
    it('GET /elastic/visualizations/{tab}/{pattern}', async () => {
      const res = await needle(
        'get',
        `${kibanaServer}:5601/elastic/visualizations/overview-general/${PORTAL9_ALERTS_PATTERN}`,
        {},
        headers
      );
      res.body.acknowledge.should.be.eql(true);
      res.body.raw.should.be.a('array');
      res.body.raw.length.should.be.eql(15);
      res.body.raw[0].attributes.should.be.a('object');
      res.body.raw[0].type.should.be.eql('visualization');
      res.body.raw[0].id.should.be.a('string');
    });

    it('POST /elastic/visualizations/{tab}/{pattern}', async () => {
      const res = await needle(
        'post',
        `${kibanaServer}:5601/elastic/visualizations/cluster-monitoring/${PORTAL9_ALERTS_PATTERN}`,
        { nodes: { items: [], name: 'node01' } },
        headers
      );
      res.body.acknowledge.should.be.eql(true);
      res.body.raw.should.be.a('array');
      res.body.raw.length.should.be.eql(4);
      res.body.raw[0].attributes.should.be.a('object');
      res.body.raw[0].type.should.be.eql('visualization');
      res.body.raw[0].id.should.be.a('string');
    });
  });

  describe('Checking template and index pattern existance', () => {
    it('GET /elastic/template/{pattern}', async () => {
      const res = await needle(
        'get',
        `${kibanaServer}:5601/elastic/template/${PORTAL9_ALERTS_PATTERN}`,
        {},
        headers
      );
      res.body.statusCode.should.be.eql(200);
      res.body.status.should.be.eql(true);
      res.body.data.should.be.eql(`Template found for ${PORTAL9_ALERTS_PATTERN}`);
    });

    it('GET /elastic/index-patterns/{pattern}', async () => {
      const res = await needle(
        'get',
        `${kibanaServer}:5601/elastic/index-patterns/${PORTAL9_ALERTS_PATTERN}`,
        {},
        headers
      );
      res.body.statusCode.should.be.eql(200);
      res.body.status.should.be.eql(true);
      res.body.data.should.be.eql('Index pattern found');
    });
  });
});
