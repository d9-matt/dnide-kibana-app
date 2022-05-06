/*
 * Portal9 app - Overview visualizations
 * Copyright (C) 2015-2021 Portal9, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

export const visualizations = {
  general: {
    rows: [
      {
        height: 360,
        vis: [
          {
            title: 'Alert level evolution',
            id: 'Portal9-App-Overview-General-Alert-level-evolution',
            width: 60
          },
          {
            title: 'Top MITRE ATT&CKS',
            id: 'Portal9-App-Overview-General-Alerts-Top-Mitre',
            width: 40
          }
        ]
      },
      {
        height: 360,
        vis: [
          {
            title: 'Top 5 agents',
            id: 'Portal9-App-Overview-General-Top-5-agents',
            width: 30
          },
          {
            title: 'Alerts evolution - Top 5 agents',
            id: 'Portal9-App-Overview-General-Alerts-evolution-Top-5-agents',
            width: 70
          },
        ]
      },
      {
        hide: true,
        vis: [
          {
            title: 'Alerts summary',
            id: 'Portal9-App-Overview-General-Alerts-summary'
          }
        ]
      }
    ]
  },
  fim: {
    rows: [
      {
        height: 400,
        vis: [
          {
            title: 'Alerts by action over time',
            id: 'Portal9-App-Agents-FIM-Alerts-by-action-over-time'
          }
        ]
      },
      {
        height: 300,
        vis: [
          {
            title: 'Top 5 agents',
            id: 'Portal9-App-Overview-FIM-Top-5-agents-pie',
            width: 30
          },
          {
            title: 'Events summary',
            id: 'Portal9-App-Overview-FIM-Events-summary',
            width: 70
          }
        ]
      },
      {
        height: 300,
        vis: [
          {
            title: 'Rule distribution',
            id: 'Portal9-App-Overview-FIM-Top-5-rules',
            width: 33
          },
          {
            title: 'Actions',
            id: 'Portal9-App-Overview-FIM-Common-actions',
            width: 33
          },
          {
            title: 'Top 5 users',
            id: 'Portal9-App-Overview-FIM-top-agents-user',
            width: 34
          }
        ]
      },
      {
        hide: true,
        vis: [
          {
            title: 'Alerts summary',
            id: 'Portal9-App-Overview-FIM-Alerts-summary'
          }
        ]
      }
    ]
  },
  aws: {
    rows: [
      {
        height: 250,
        vis: [
          {
            title: 'Sources',
            id: 'Portal9-App-Overview-AWS-Top-sources',
            width: 25
          },
          {
            title: 'Accounts',
            id: 'Portal9-App-Overview-AWS-Top-accounts',
            width: 25
          },
          {
            title: 'S3 buckets',
            id: 'Portal9-App-Overview-AWS-Top-buckets',
            width: 25
          },
          {
            title: 'Regions',
            id: 'Portal9-App-Overview-AWS-Top-regions',
            width: 25
          }
        ]
      },
      {
        height: 300,
        vis: [
          {
            title: 'Events by source over time',
            id: 'Portal9-App-Overview-AWS-Events-by-source',
            width: 50
          },
          {
            title: 'Events by S3 bucket over time',
            id: 'Portal9-App-Overview-AWS-Events-by-s3-bucket',
            width: 50
          }
        ]
      },
      {
        height: 570,
        vis: [
          {
            title: 'Geolocation map',
            id: 'Portal9-App-Overview-AWS-geo'
          }
        ]
      },
      {
        hide: true,
        vis: [
          {
            title: 'Alerts summary',
            id: 'Portal9-App-Overview-AWS-Alerts-summary'
          }
        ]
      }
    ]
  },
  gcp: {
    rows: [
      {
        height: 250,
        vis: [
          {
            title: 'Events over time by auth answer',
            id: 'Portal9-App-Overview-GCP-Alerts-Evolution-By-AuthAnswer',
            width: 100
          }
        ]
      },
      {
        height: 250,
        vis: [
          {
            title: 'Top instances by response code',
            id: 'Portal9-App-Overview-GCP-Top-vmInstances-By-ResponseCode',
            width: 25
          },
          {
            title: 'Resource type by project id',
            id: 'Portal9-App-Overview-GCP-Top-ResourceType-By-Project-Id',
            width: 50
          },
          {
            title: 'Top project id by sourcetype',
            id: 'Portal9-App-Overview-GCP-Top-ProjectId-By-SourceType',
            width: 25
          },
        ]
      },
      {
        height: 450,
        vis: [
          {
            title: 'Top 5 Map by source ip',
            id: 'Portal9-App-Overview-GCP-Map-By-SourceIp',
            width: 100
          },
        ]
      },
      {
        hide: true,
        vis: [
          {
            title: 'Alerts summary',
            id: 'Portal9-App-Overview-GCP-Alerts-summary'
          }
        ]
      }
    ]
  },
  pci: {
    rows: [
      {
        height: 400,
        vis: [
          {
            title: 'PCI DSS requirements',
            id: 'Portal9-App-Overview-PCI-DSS-requirements',
            width: 50
          },
          {
            title: 'Top 10 agents by alerts number',
            id: 'Portal9-App-Overview-PCI-DSS-Agents',
            width: 50
          }
        ]
      },
      {
        height: 300,
        vis: [
          {
            title: 'Top requirements over time',
            id: 'Portal9-App-Overview-PCI-DSS-Requirements-over-time'
          }
        ]
      },
      {
        height: 530,
        vis: [
          {
            title: 'Last alerts',
            id: 'Portal9-App-Overview-PCI-DSS-Requirements-Agents-heatmap'
          }
        ]
      },
      {
        height: 255,
        vis: [
          {
            title: 'Requirements by agent',
            id: 'Portal9-App-Overview-PCI-DSS-Requirements-by-agent'
          }
        ]
      },
      {
        hide: true,
        vis: [
          {
            title: 'Alerts summary',
            id: 'Portal9-App-Overview-PCI-DSS-Alerts-summary'
          }
        ]
      }
    ]
  },
  gdpr: {
    rows: [
      {
        height: 400,
        vis: [
          {
            title: 'Top 10 agents by alerts number',
            id: 'Portal9-App-Overview-GDPR-Agents',
            width: 30
          },
          {
            title: 'GDPR requirements',
            id: 'Portal9-App-Overview-GDPR-requirements',
            width: 70
          }
        ]
      },
      {
        height: 300,
        vis: [
          {
            title: 'Top requirements over time',
            id: 'Portal9-App-Overview-GDPR-Requirements-heatmap'
          }
        ]
      },
      {
        height: 530,
        vis: [
          {
            title: 'Last alerts',
            id: 'Portal9-App-Overview-GDPR-Requirements-Agents-heatmap'
          }
        ]
      },
      {
        height: 255,
        vis: [
          {
            title: 'Requirements by agent',
            id: 'Portal9-App-Overview-GDPR-Requirements-by-agent'
          }
        ]
      },
      {
        hide: true,
        vis: [
          {
            title: 'Alerts summary',
            id: 'Portal9-App-Overview-GDPR-Alerts-summary'
          }
        ]
      }
    ]
  },
  nist: {
    rows: [
      {
        height: 400,
        vis: [
          {
            title: 'Most active agents',
            id: 'Portal9-App-Overview-NIST-Agents',
            width: 20
          },
          {
            title: 'Top requirements over time',
            id: 'Portal9-App-Overview-NIST-Requirements-over-time',
            width: 50
          },
          {
            title: 'Requiments distribution by agent',
            id: 'Portal9-App-Overview-NIST-requirements-by-agents',
            width: 30
          }
        ]
      },
      {
        height: 350,
        vis: [
          {
            title: 'Alerts volume by agent',
            id: 'Portal9-App-Overview-NIST-Requirements-Agents-heatmap',
            width: 50
          },
          {
            title: 'Stats',
            id: 'Portal9-App-Overview-NIST-Metrics',
            width: 20
          },
          {
            title: 'Top 10 requirements',
            id: 'Portal9-App-Overview-NIST-Top-10-requirements',
            width: 30
          }
        ]
      },
      {
        hide: true,
        vis: [
          {
            title: 'Alerts summary',
            id: 'Portal9-App-Overview-NIST-Alerts-summary'
          }
        ]
      }
    ]
  },
  tsc: {
    rows: [
      {
        height: 400,
        vis: [
          {
            title: 'TSC requirements',
            id: 'Portal9-App-Overview-TSC-requirements',
            width: 50
          },
          {
            title: 'Top 10 agents by alerts number',
            id: 'Portal9-App-Overview-TSC-Agents',
            width: 50
          }
        ]
      },
      {
        height: 300,
        vis: [
          {
            title: 'Top requirements over time',
            id: 'Portal9-App-Overview-TSC-Requirements-over-time'
          }
        ]
      },
      {
        height: 530,
        vis: [
          {
            title: 'Last alerts',
            id: 'Portal9-App-Overview-TSC-Requirements-Agents-heatmap'
          }
        ]
      },
      {
        height: 255,
        vis: [
          {
            title: 'Requirements by agent',
            id: 'Portal9-App-Overview-TSC-Requirements-by-agent'
          }
        ]
      },
      {
        hide: true,
        vis: [
          {
            title: 'Alerts summary',
            id: 'Portal9-App-Overview-TSC-Alerts-summary'
          }
        ]
      }
    ]
  },
  hipaa: {
    rows: [
      {
        height: 570,
        vis: [
          {
            title: 'Alerts volume by agent',
            id: 'Portal9-App-Overview-HIPAA-Heatmap',
            width: 50
          },
          {
            hasRows: true,
            width: 50,
            rows: [
              {
                height: 285,
                vis: [
                  {
                    title: 'Most common alerts',
                    id: 'Portal9-App-Overview-HIPAA-Tag-cloud',
                    width: 50
                  },
                  {
                    title: 'Top 10 requirements',
                    id: 'Portal9-App-Overview-HIPAA-Top-10-requirements',
                    width: 50
                  }
                ]
              },
              {
                height: 285,
                noMargin: true,
                vis: [
                  {
                    title: 'Most active agents',
                    id: 'Portal9-App-Overview-HIPAA-Top-10-agents',
                    width: 50
                  },
                  {
                    title: 'Stats',
                    id: 'Portal9-App-Overview-HIPAA-Metrics',
                    width: 50
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        height: 400,
        vis: [
          {
            title: 'Requirements evolution over time',
            id: 'Portal9-App-Overview-HIPAA-Top-requirements-over-time',
            width: 50
          },
          {
            title: 'Requirements distribution by agent',
            id:
              'Portal9-App-Overview-HIPAA-Top-10-requirements-over-time-by-agent',
            width: 50
          }
        ]
      },
      {
        hide: true,
        vis: [
          {
            title: 'Alerts summary',
            id: 'Portal9-App-Overview-HIPAA-Alerts-summary'
          }
        ]
      }
    ]
  },
  vuls: {
    rows: [
      {
        height: 330,
        vis: [
          {
            title: 'Most affected agents',
            id: 'Portal9-App-Overview-vuls-Most-affected-agents',
            width: 30
          },
          {
            title: 'Alerts severity',
            id: 'Portal9-App-Overview-vuls-Alerts-severity',
            width: 70
          }
        ]
      },
      {
        height: 330,
        vis: [
          {
            title: 'Most common CVEs',
            id: 'Portal9-App-Overview-vuls-Most-common-CVEs',
            width: 30
          },
          {
            title: 'TOP affected packages alerts Evolution',
            id: 'Portal9-App-Overview-vuls-Vulnerability-evolution-affected-packages',
            width: 40
          },
          {
            title: 'Most common CWEs',
            id: 'Portal9-App-Overview-vuls-Most-common-CWEs',
            width: 30
          }
        ]
      },
      {
        height: 450,
        vis: [
          {
            title: 'Top affected packages by CVEs',
            id: 'Portal9-App-Overview-vuls-packages-CVEs',
            width: 50
          },
          {
            title: 'Agents by severity',
            id: 'Portal9-App-Overview-vuls-agents-severities',
            width: 50
          }
        ]
      },
      {
        hide: true,
        vis: [
          {
            title: 'Alert summary',
            id: 'Portal9-App-Overview-vuls-Alert-summary'
          }
        ]
      }
    ]
  },
  virustotal: {
    rows: [
      {
        height: 360,
        vis: [
          {
            title: 'Unique malicious files per agent',
            id: 'Portal9-App-Overview-Virustotal-Malicious-Per-Agent',
            width: 50
          },
          {
            title: 'Last scanned files',
            id: 'Portal9-App-Overview-Virustotal-Last-Files-Pie',
            width: 50
          }
        ]
      },
      {
        height: 550,
        vis: [
          {
            title: 'Alerts evolution by agents',
            id: 'Portal9-App-Overview-Virustotal-Alerts-Evolution'
          }
        ]
      },
      {
        height: 250,
        vis: [
          {
            title: 'Malicious files alerts evolution',
            id: 'Portal9-App-Overview-Virustotal-Malicious-Evolution'
          }
        ]
      },
      {
        height: 570,
        vis: [
          {
            title: 'Last files',
            id: 'Portal9-App-Overview-Virustotal-Files-Table'
          }
        ]
      },
      {
        hide: true,
        vis: [
          {
            title: 'Alerts summary',
            id: 'Portal9-App-Overview-Virustotal-Alerts-summary'
          }
        ]
      }
    ]
  },
  osquery: {
    rows: [
      {
        height: 300,
        vis: [
          {
            title: 'Top 5 Osquery events added',
            id: 'Portal9-App-Overview-Osquery-Top-5-added',
            width: 25
          },
          {
            title: 'Top 5 Osquery events removed',
            id: 'Portal9-App-Overview-Osquery-Top-5-removed',
            width: 25
          },
          {
            title: 'Evolution of Osquery events per pack over time',
            id: 'Portal9-App-Agents-Osquery-Evolution',
            width: 50
          }
        ]
      },
      {
        height: 300,
        vis: [
          {
            title: 'Most common packs',
            id: 'Portal9-App-Overview-Osquery-Most-common-packs',
            width: 30
          },
          {
            title: 'Top 5 rules',
            id: 'Portal9-App-Overview-Osquery-Top-5-rules',
            width: 70
          }
        ]
      },
      {
        hide: true,
        vis: [
          {
            title: 'Alerts summary',
            id: 'Portal9-App-Overview-Osquery-Alerts-summary'
          }
        ]
      }
    ]
  },
  mitre: {
    rows: [
      {
        height: 360,
        vis: [
          {
            title: 'Alerts evolution over time',
            id: 'Portal9-App-Overview-MITRE-Alerts-Evolution',
            width: 75
          },
          {
            title: 'Top tactics',
            id: 'Portal9-App-Overview-MITRE-Top-Tactics',
            width: 25
          }
        ]
      },
      {
        height: 360,
        vis: [
          {
            title: 'Attacks by technique',
            id: 'Portal9-App-Overview-MITRE-Attacks-By-Technique',
            width: 33
          },
          {
            title: 'Top tactics by agent',
            id: 'Portal9-App-Overview-MITRE-Top-Tactics-By-Agent',
            width: 34
          },
          {
            title: 'Mitre techniques by agent',
            id: 'Portal9-App-Overview-MITRE-Attacks-By-Agent',
            width: 33
          }
        ]
      },
      {
        hide: true,
        vis: [
          {
            title: 'Alerts summary',
            id: 'Portal9-App-Overview-MITRE-Alerts-summary'
          }
        ]
      }
    ]
  },
  docker: {
    rows: [
      {
        height: 300,
        vis: [
          {
            title: 'Top 5 images',
            id: 'Portal9-App-Overview-Docker-top-5-images',
            width: 25
          },
          {
            title: 'Top 5 events',
            id: 'Portal9-App-Overview-Docker-top-5-actions',
            width: 25
          },
          {
            title: 'Resources usage over time',
            id: 'Portal9-App-Overview-Docker-Types-over-time',
            width: 50
          }
        ]
      },
      {
        height: 300,
        vis: [
          {
            title: 'Events occurred evolution',
            id: 'Portal9-App-Overview-Docker-Actions-over-time'
          }
        ]
      },
      {
        hide: true,
        vis: [
          {
            title: 'Alerts summary',
            id: 'Portal9-App-Overview-Docker-Events-summary'
          }
        ]
      }
    ]
  },
  oscap: {
    rows: [
      {
        height: 215,
        vis: [
          {
            title: 'Top 5 Agents',
            id: 'Portal9-App-Overview-OSCAP-Agents',
            width: 25
          },
          {
            title: 'Top 5 Profiles',
            id: 'Portal9-App-Overview-OSCAP-Profiles',
            width: 25
          },
          {
            title: 'Top 5 Content',
            id: 'Portal9-App-Overview-OSCAP-Content',
            width: 25
          },
          {
            title: 'Top 5 Severity',
            id: 'Portal9-App-Overview-OSCAP-Severity',
            width: 25
          }
        ]
      },
      {
        height: 240,
        vis: [
          {
            title: 'Top 5 Agents - Severity high',
            id: 'Portal9-App-Overview-OSCAP-Top-5-agents-Severity-high'
          }
        ]
      },
      {
        height: 320,
        vis: [
          {
            title: 'Top 10 - Alerts',
            id: 'Portal9-App-Overview-OSCAP-Top-10-alerts',
            width: 50
          },
          {
            title: 'Top 10 - High risk alerts',
            id: 'Portal9-App-Overview-OSCAP-Top-10-high-risk-alerts',
            width: 50
          }
        ]
      },
      {
        hide: true,
        vis: [
          {
            title: 'Alerts summary',
            id: 'Portal9-App-Overview-OSCAP-Last-alerts'
          }
        ]
      }
    ]
  },
  ciscat: {
    rows: [
      {
        height: 320,
        vis: [
          {
            title: 'Top 5 CIS-CAT groups',
            id: 'Portal9-app-Overview-CISCAT-top-5-groups',
            width: 60
          },
          {
            title: 'Scan result evolution',
            id: 'Portal9-app-Overview-CISCAT-scan-result-evolution',
            width: 40
          }
        ]
      },
      {
        hide: true,
        vis: [
          {
            title: 'Alerts summary',
            id: 'Portal9-app-Overview-CISCAT-alerts-summary'
          }
        ]
      }
    ]
  },
  pm: {
    rows: [
      {
        height: 290,
        vis: [
          {
            title: 'Events over time',
            id: 'Portal9-App-Overview-PM-Events-over-time',
            width: 50
          },
          {
            title: 'Rule distribution',
            id: 'Portal9-App-Overview-PM-Top-5-rules',
            width: 25
          },
          {
            title: 'Top 5 agents',
            id: 'Portal9-App-Overview-PM-Top-5-agents-pie',
            width: 25
          }
        ]
      },
      {
        height: 240,
        vis: [
          {
            title: 'Events per control type evolution',
            id: 'Portal9-App-Overview-PM-Events-per-agent-evolution'
          }
        ]
      },
      {
        hide: true,
        vis: [
          {
            title: 'Alerts summary',
            id: 'Portal9-App-Overview-PM-Alerts-summary'
          }
        ]
      }
    ]
  },
  audit: {
    rows: [
      {
        height: 250,
        vis: [
          {
            title: 'Groups',
            id: 'Portal9-App-Overview-Audit-Groups',
            width: 25
          },
          {
            title: 'Agents',
            id: 'Portal9-App-Overview-Audit-Agents',
            width: 25
          },
          {
            title: 'Commands',
            id: 'Portal9-App-Overview-Audit-Commands',
            width: 25
          },
          {
            title: 'Files',
            id: 'Portal9-App-Overview-Audit-Files',
            width: 25
          }
        ]
      },
      {
        height: 310,
        vis: [
          {
            title: 'Alerts over time',
            id: 'Portal9-App-Overview-Audit-Alerts-over-time'
          }
        ]
      },
      {
        hide: true,
        vis: [
          {
            title: 'Alerts summary',
            id: 'Portal9-App-Overview-Audit-Last-alerts'
          }
        ]
      }
    ]
  }
};
