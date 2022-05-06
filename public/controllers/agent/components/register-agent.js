/*
 * Portal9 app - React component for registering agents.
 * Copyright (C) 2015-2021 Portal9, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
import React, { Component, Fragment } from 'react';
import { version, kibana } from '../../../../package.json';
import { Portal9Config } from '../../../react-services/portal9-config';
import {
  EuiSteps,
  EuiTabs,
  EuiTabbedContent,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiButtonToggle,
  EuiButtonGroup,
  EuiFormRow,
  EuiComboBox,
  EuiFieldText,
  EuiText,
  EuiCodeBlock,
  EuiTitle,
  EuiButton,
  EuiButtonEmpty,
  EuiCopy,
  EuiPage,
  EuiPageBody,
  EuiCallOut,
  EuiSpacer,
  EuiProgress,
  EuiCode,
  EuiLink
} from '@elastic/eui';
import { WzRequest } from '../../../react-services/wz-request';


const architectureButtons = [
  {
    id: 'i386',
    label: 'i386'
  },
  {
    id: 'x86_64',
    label: 'x86_64'
  },
  {
    id: 'armhf',
    label: 'armhf'
  },
  {
    id: 'aarch64',
    label: 'aarch64'
  }
];
const architectureCentos5 = [
  {
    id: 'i386',
    label: 'i386'
  },
  {
    id: 'x86_64',
    label: 'x86_64'
  }
];

const versionButtonsCentos = [
  {
    id: 'centos5',
    label: 'CentOS5'
  },
  {
    id: 'centos6',
    label: 'CentOS6 or higher'
  }
];

const osButtons = [
  {
    id: 'rpm',
    label: 'Red Hat / CentOS'
  },
  {
    id: 'deb',
    label: 'Debian / Ubuntu'
  },
  {
    id: 'win',
    label: 'Windows'
  },
  {
    id: 'macos',
    label: 'MacOS'
  }
];

const sysButtons = [
  {
    id: 'systemd',
    label: 'Systemd'
  },
  {
    id: 'sysV',
    label: 'SysV Init'
  }
];

const pTextCheckConnectionStyle = {
  marginTop: '3em',
};

export class RegisterAgent extends Component {
  constructor(props) {
    super(props);
    this.portal9Config = new Portal9Config();
    this.configuration = this.portal9Config.getConfig();
    this.state = {
      status: 'incomplete',
      selectedOS: '',
      selectedSYS: '',
      neededSYS: false,
      selectedArchitecture: '',
      selectedVersion: '',
      kibanaVersion: (kibana || {}).version || false,
      version: '',
      portal9Version: '',
      serverAddress: '',
      portal9Password: '',
      groups: [],
      selectedGroup: [],
      udpProtocol: false,
    };
    this.restartAgentCommand = {
      rpm: this.systemSelector(),
      deb: this.systemSelector(),
      macos: 'sudo /Library/Ossec/bin/portal9-control start',
    };
  }

  async componentDidMount() {
    try {
      this.setState({ loading: true });
      const portal9Version = await this.props.getPortal9Version();
      let serverAddress = false;
      let portal9Password = '';
      let hidePasswordInput = false;
      serverAddress = this.configuration['enrollment.dns'] || false;
      if (!serverAddress) {
        serverAddress = await this.props.getCurrentApiAddress();
      }
      let authInfo = await this.getAuthInfo();
      const needsPassword = (authInfo.auth || {}).use_password === 'yes';
      if (needsPassword) {
        portal9Password = this.configuration['enrollment.password'] || authInfo['authd.pass'] || '';
        if (portal9Password) {
          hidePasswordInput = true;
        }
      }

      const udpProtocol = await this.getRemoteInfo();
      const groups = await this.getGroups();
      this.setState({
        serverAddress,
        needsPassword,
        hidePasswordInput,
        versionButtonsCentos,
        architectureButtons,
        architectureCentos5,
        portal9Password,
        udpProtocol,
        portal9Version,
        groups,
        loading: false,
      });
    } catch (error) {
      this.setState({
        portal9Version: version,
        loading: false,
      });
    }
  }

  async getAuthInfo() {
    try {
      const result = await WzRequest.apiReq('GET', '/agents/000/config/auth/auth', {});
      return (result.data || {}).data || {};
    } catch (error) {
      return false;
    }
  }

  async getRemoteInfo() {
    try {
      const result = await WzRequest.apiReq('GET', '/agents/000/config/request/remote', {});
      const remote = ((result.data || {}).data || {}).remote || {};
      return (remote[0] || {}).protocol !== 'tcp' && (remote[0] || {}).protocol[0] !== 'TCP';
    } catch (error) {
      return false;
    }
  }

  selectOS(os) {
    this.setState({
      selectedOS: os,
      selectedVersion: '',
      selectedArchitecture: '',
      selectedSYS: 'systemd',
    });
  }

  systemSelector() {
    if (this.state.selectedOS === 'rpm') {
      if (this.state.selectedSYS === 'systemd') {
        return 'sudo systemctl daemon-reload\nsudo systemctl enable portal9-agent\nsudo systemctl start portal9-agent';
      } else return 'sudo chkconfig --add portal9-agent\nsudo service portal9-agent start';
    } else if (this.state.selectedOS === 'deb') {
      if (this.state.selectedSYS === 'systemd') {
        return 'sudo systemctl daemon-reload\nsudo systemctl enable portal9-agent\nsudo systemctl start portal9-agent';
      } else return 'sudo update-rc.d portal9-agent defaults 95 10\nsudo service portal9-agent start';
    } else return '';
  }

  selectSYS(sys) {
    this.setState({ selectedSYS: sys });
  }

  setServerAddress(event) {
    this.setState({ serverAddress: event.target.value });
  }

  setGroupName(selectedGroup) {
    this.setState({ selectedGroup });
  }

  setArchitecture(selectedArchitecture) {
    this.setState({ selectedArchitecture });
  }

  setVersion(selectedVersion) {
    this.setState({ selectedVersion, selectedArchitecture: '' });
  }

  setPortal9Password(event) {
    this.setState({ portal9Password: event.target.value });
  }

  obfuscatePassword(text) {
    let obfuscate = '';
    const regex = /WAZUH_REGISTRATION_PASSWORD=?\040?\'(.*?)\'/gm;
    const match = regex.exec(text);
    const password = match[1];
    if (password) {
      [...password].forEach(() => (obfuscate += '*'));
      text = text.replace(password, obfuscate);
    }
    return text;
  }

  async getGroups() {
    try {
      const result = await WzRequest.apiReq('GET', '/groups', {});
      return result.data.data.affected_items.map((item) => ({ label: item.name, id: item.name }));
    } catch (error) {
      return [];
    }
  }

  optionalDeploymentVariables() {
    let deployment = `WAZUH_MANAGER='${this.state.serverAddress}' `;
    if (this.state.selectedOS == 'win') {
      deployment += `WAZUH_REGISTRATION_SERVER='${this.state.serverAddress}' `;
    }

    if (this.state.needsPassword) {
      deployment += `WAZUH_REGISTRATION_PASSWORD='${this.state.portal9Password}' `;
    }

    if (this.state.udpProtocol) {
      deployment += `WAZUH_PROTOCOL='UDP' `;
    }

    if (this.state.selectedGroup.length) {
      deployment += `WAZUH_AGENT_GROUP='${this.state.selectedGroup.map((item) => item.label).join(',')}' `;
    }

    // macos doesnt need = param
    if (this.state.selectedOS === 'macos') {
      return deployment.replace(/=/g, ' ');
    }

    return deployment;
  }


  resolveRPMPackage() {
    switch (`${this.state.selectedVersion}-${this.state.selectedArchitecture}`) {
      case 'centos5-i386':
        return `https://packages.portal9.com/4.x/yum5/i386/portal9-agent-${this.state.portal9Version}-1.el5.i386.rpm`;
      case 'centos5-x86_64':
        return `https://packages.portal9.com/4.x/yum5/x86_64/portal9-agent-${this.state.portal9Version}-1.el5.x86_64.rpm`;
      case 'centos6-i386':
        return `https://packages.portal9.com/4.x/yum/portal9-agent-${this.state.portal9Version}-1.i386.rpm`;
      case 'centos6-aarch64':
        return `https://packages.portal9.com/4.x/yum/portal9-agent-${this.state.portal9Version}-1.aarch64.rpm`;
      case 'centos6-x86_64':
        return `https://packages.portal9.com/4.x/yum/portal9-agent-${this.state.portal9Version}-1.x86_64.rpm`;
      case 'centos6-armhf':
        return `https://packages.portal9.com/4.x/yum/portal9-agent-${this.state.portal9Version}-1.armv7hl.rpm`;
      default:
        return `https://packages.portal9.com/4.x/yum/portal9-agent-${this.state.portal9Version}-1.x86_64.rpm`;
    }
  }

  resolveDEBPackage() {
    switch (`${this.state.selectedArchitecture}`) {
      case 'i386':
        return `https://packages.portal9.com/4.x/apt/pool/main/w/portal9-agent/portal9-agent_${this.state.portal9Version}-1_i386.deb`;
      case 'aarch64':
        return `https://packages.portal9.com/4.x/apt/pool/main/w/portal9-agent/portal9-agent_${this.state.portal9Version}-1_arm64.deb`;
      case 'armhf':
        return `https://packages.portal9.com/4.x/apt/pool/main/w/portal9-agent/portal9-agent_${this.state.portal9Version}-1_armhf.deb`;
      case 'x86_64':
        return `https://packages.portal9.com/4.x/apt/pool/main/w/portal9-agent/portal9-agent_${this.state.portal9Version}-1_amd64.deb`;
      default:
        return `https://packages.portal9.com/4.x/apt/pool/main/w/portal9-agent/portal9-agent_${this.state.portal9Version}-1_amd64.deb`;
    }
  }

  optionalPackages() {
    switch (this.state.selectedOS) {
      case 'rpm':
        return this.resolveRPMPackage();
      case 'deb':
        return this.resolveDEBPackage();
      default:
        return `https://packages.portal9.com/4.x/yum5/x86_64/portal9-agent-${this.state.portal9Version}-1.x86_64.rpm`;
    }
  }

  checkMissingOSSelection() {
    if (!this.state.selectedOS) {
      return ['Operating system'];
    }
    switch (this.state.selectedOS) {
      case 'rpm':
        return [
          ...(!this.state.selectedVersion ? ['OS version'] : []),
          ...(this.state.selectedVersion && !this.state.selectedArchitecture
            ? ['OS architecture']
            : []),
        ];
      case 'deb':
        return [...(!this.state.selectedArchitecture ? ['OS architecture'] : [])];
      default:
        return [];
    }
  }

  getHighlightCodeLanguage(selectedSO){
    if(selectedSO.toLowerCase() === 'win'){
      const iKibanaVersion = parseFloat(this.state.kibanaVersion.split('.').slice(0, 2).join('.'),2);
      return iKibanaVersion < 7.14 ? 'ps' : 'powershell';
    }else{
      return 'bash';
    }
  }

  render() {
    const appVersionMajorDotMinor = this.state.portal9Version.split('.').slice(0, 2).join('.'); 
    const urlCheckConnectionDocumentation = `https://documentation.portal9.com/${appVersionMajorDotMinor}/user-manual/agents/agent-connection.html`;
    const textAndLinkToCheckConnectionDocumentation = (
      <p style={pTextCheckConnectionStyle}>
        To verify the connection with the Manager, please follow this{' '}
        <a href={urlCheckConnectionDocumentation} target="_blank">
          document.
        </a>
      </p>
    );
    const missingOSSelection = this.checkMissingOSSelection();
    const ipInput = (
      <EuiText>
        <p>
          You can predefine the Portal9 server address with the <EuiCode>enrollment.dns</EuiCode>{' '}
          Portal9 app setting.
        </p>
        <EuiFieldText
          placeholder="Server address"
          value={this.state.serverAddress}
          onChange={(event) => this.setServerAddress(event)}
        />
      </EuiText>
    );

    const groupInput = (
      <EuiText>
        <p>Select one or more existing groups</p>
        <EuiComboBox
          placeholder="Select group"
          options={this.state.groups}
          selectedOptions={this.state.selectedGroup}
          onChange={(group) => {
            this.setGroupName(group);
          }}
          isDisabled={!this.state.groups.length}
          isClearable={true}
          data-test-subj="demoComboBox"
        />
      </EuiText>
    );

    const passwordInput = (
      <EuiFieldText
        placeholder="Portal9 password"
        value={this.state.portal9Password}
        onChange={(event) => this.setPortal9Password(event)}
      />
    );

    const codeBlock = {
      zIndex: '100',
    };
    const customTexts = {
      rpmText: `sudo ${this.optionalDeploymentVariables()}yum install ${this.optionalPackages()}`,
      debText: `curl -so portal9-agent-${this.state.portal9Version}.deb ${this.optionalPackages()} && sudo ${this.optionalDeploymentVariables()}dpkg -i ./portal9-agent-${this.state.portal9Version}.deb`,
      macosText: `curl -so portal9-agent-${this.state.portal9Version}.pkg https://packages.portal9.com/4.x/macos/portal9-agent-${
        this.state.portal9Version
      }-1.pkg && sudo launchctl setenv ${this.optionalDeploymentVariables()}&& sudo installer -pkg ./portal9-agent-${this.state.portal9Version}.pkg -target /`,
      winText: `Invoke-WebRequest -Uri https://packages.portal9.com/4.x/windows/portal9-agent-${
        this.state.portal9Version
      }-1.msi -OutFile portal9-agent-${this.state.portal9Version}.msi; ./portal9-agent-${this.state.portal9Version}.msi /q ${this.optionalDeploymentVariables()}`,
    };

    const field = `${this.state.selectedOS}Text`;
    const text = customTexts[field];
    const language = this.getHighlightCodeLanguage(this.state.selectedOS);
    const windowsAdvice = this.state.selectedOS === 'win' && (
      <>
        <EuiCallOut
          title="You will need administrator privileges to perform this installation."
          iconType="iInCircle"
        />
        <EuiSpacer></EuiSpacer>
      </>
    );
    const restartAgentCommand = this.restartAgentCommand[this.state.selectedOS];
    const onTabClick = (selectedTab) => {
      this.selectSYS(selectedTab.id);
    };

    const guide = (
      <div>
        {this.state.selectedOS && (
          <EuiText>
            <p>You can use this command to install and enroll the Portal9 agent in one or more hosts.</p>
            <EuiCallOut
              color="warning"
              title={<>Running this command on a host with an agent already installed upgrades the agent package without enrolling the agent. To enroll it, see the <EuiLink href="https://documentation.portal9.com/current/user-manual/registering/index.html">Portal9 documentation</EuiLink>.</>}
              iconType="iInCircle"
            />
            <EuiSpacer />
            <EuiCodeBlock style={codeBlock} language={language}>
              {this.state.portal9Password ? this.obfuscatePassword(text) : text}
            </EuiCodeBlock>
            {windowsAdvice}
            <EuiCopy textToCopy={text}>
              {(copy) => (
                <EuiButton fill iconType="copy" onClick={copy}>
                  Copy command
                </EuiButton>
              )}
            </EuiCopy>
          </EuiText>
        )}
      </div>
    );

    const tabs = [
      {
        id: 'systemd',
        name: 'Systemd',
        content: (
          <Fragment>
            <EuiSpacer />
            <EuiText>
              <EuiCodeBlock style={codeBlock} language={language}>
                {this.systemSelector()}
              </EuiCodeBlock>
              <EuiCopy textToCopy={this.systemSelector()}>
                {(copy) => (
                  <EuiButton fill iconType="copy" onClick={copy}>
                    Copy command
                  </EuiButton>
                )}
              </EuiCopy>
              {textAndLinkToCheckConnectionDocumentation}
            </EuiText>
          </Fragment>
        ),
      },
      {
        id: 'sysV',
        name: 'SysV Init',
        content: (
          <Fragment>
            <EuiSpacer />
            <EuiText>
              <EuiCodeBlock style={codeBlock} language={language}>
                {this.systemSelector()}
              </EuiCodeBlock>
              <EuiCopy textToCopy={this.systemSelector()}>
                {(copy) => (
                  <EuiButton fill iconType="copy" onClick={copy}>
                    Copy command
                  </EuiButton>
                )}
              </EuiCopy>
              {textAndLinkToCheckConnectionDocumentation}
            </EuiText>
          </Fragment>
        ),
      },
    ];

    const steps = [
      {
        title: 'Choose the Operating system',
        children: (
          <EuiButtonGroup
            color="primary"
            legend="Choose the Operating system"
            options={osButtons}
            idSelected={this.state.selectedOS}
            onChange={(os) => this.selectOS(os)}
          />
        ),
      },
      ...(this.state.selectedOS == 'rpm'
        ? [
            {
              title: 'Choose the version',
              children: (
                <EuiButtonGroup
                  color="primary"
                  legend="Choose the version"
                  options={versionButtonsCentos}
                  idSelected={this.state.selectedVersion}
                  onChange={(version) => this.setVersion(version)}
                />
              ),
            },
          ]
        : []),
      ...(this.state.selectedOS == 'rpm' && this.state.selectedVersion == 'centos5'
        ? [
            {
              title: 'Choose the architecture',
              children: (
                <EuiButtonGroup
                  color="primary"
                  legend="Choose the architecture"
                  options={this.state.architectureCentos5}
                  idSelected={this.state.selectedArchitecture}
                  onChange={(architecture) => this.setArchitecture(architecture)}
                />
              ),
            },
          ]
        : []),
      ...(this.state.selectedOS == 'deb' ||
      (this.state.selectedOS == 'rpm' && this.state.selectedVersion == 'centos6')
        ? [
            {
              title: 'Choose the architecture',
              children: (
                <EuiButtonGroup
                  color="primary"
                  legend="Choose the architecture"
                  options={this.state.architectureButtons}
                  idSelected={this.state.selectedArchitecture}
                  onChange={(architecture) => this.setArchitecture(architecture)}
                />
              ),
            },
          ]
        : []),
      {
        title: 'Portal9 server address',
        children: <Fragment>{ipInput}</Fragment>,
      },
      ...(!(!this.state.needsPassword || this.state.hidePasswordInput)
        ? [
            {
              title: 'Portal9 password',
              children: <Fragment>{passwordInput}</Fragment>,
            },
          ]
        : []),
      {
        title: 'Assign the agent to a group',
        children: <Fragment>{groupInput}</Fragment>,
      },
      {
        title: 'Install and enroll the agent',
        children: missingOSSelection.length ? (
          <EuiCallOut
            color="warning"
            title={`Please select the ${missingOSSelection.join(', ')}.`}
            iconType="iInCircle"
          />
        ) : (
          <div>{guide}</div>
        ),
      },
      ...(this.state.selectedOS == 'rpm' || this.state.selectedOS == 'deb'
        ? [
            {
              title: 'Start the agent',
              children: missingOSSelection.length ? (
                <EuiCallOut
                  color="warning"
                  title={`Please select the ${missingOSSelection.join(', ')}.`}
                  iconType="iInCircle"
                />
              ) : (
                <EuiTabbedContent
                  tabs={tabs}
                  selectedTab={this.selectedSYS}
                  onTabClick={onTabClick}
                />
              ),
            },
          ]
        : []),

      ...(!missingOSSelection.length &&
      this.state.selectedOS !== 'rpm' &&
      this.state.selectedOS !== 'deb' &&
      restartAgentCommand
        ? [
            {
              title: 'Start the agent',
              children: (
                <EuiFlexGroup direction="column">
                  <EuiText>
                    <EuiCodeBlock style={codeBlock} language={language}>
                      {restartAgentCommand}
                    </EuiCodeBlock>
                    <EuiCopy textToCopy={restartAgentCommand}>
                      {(copy) => (
                        <EuiButton fill iconType="copy" onClick={copy}>
                          Copy command
                        </EuiButton>
                      )}
                    </EuiCopy>
                  </EuiText>
                </EuiFlexGroup>
              ),
            },
          ]
        : []),
    ];
    return (
      <div>
        <EuiPage restrictWidth="1000px" style={{ background: 'transparent' }}>
          <EuiPageBody>
            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiPanel>
                  <EuiFlexGroup>
                    <EuiFlexItem>
                      <EuiTitle>
                        <h2>Deploy a new agent</h2>
                      </EuiTitle>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                      {this.props.hasAgents && (
                        <EuiButtonEmpty
                          size="s"
                          onClick={() => this.props.addNewAgent(false)}
                          iconType="cross"
                        >
                          Close
                        </EuiButtonEmpty>
                      )}
                      {!this.props.hasAgents && (
                        <EuiButtonEmpty
                          size="s"
                          onClick={() => this.props.reload()}
                          iconType="refresh"
                        >
                          Refresh
                        </EuiButtonEmpty>
                      )}
                    </EuiFlexItem>
                  </EuiFlexGroup>
                  <EuiSpacer></EuiSpacer>
                  {this.state.loading && (
                    <>
                      <EuiFlexItem>
                        <EuiProgress size="xs" color="primary" />
                      </EuiFlexItem>
                      <EuiSpacer></EuiSpacer>
                    </>
                  )}
                  {!this.state.loading && (
                    <EuiFlexItem>
                      <EuiSteps steps={steps} />
                    </EuiFlexItem>
                  )}
                </EuiPanel>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPageBody>
        </EuiPage>
      </div>
    );
  }
}
