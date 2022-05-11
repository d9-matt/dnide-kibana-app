# Notes
Files that where changed (on the development server) in order to get Wazuh link changed to Portal9 link:
- Changed /app/wazuh to /app/portal9
- wazuh-packages/unattended_scripts/elastic-stack/kibana/7.x/kibana.yml
- wazuh-packages/unattended_scripts/elastic-stack/kibana/7.x/kibana_all_in_one.yml
- wazuh-packages/unattended_scripts/elastic-stack/unattended-installation/distributed/templates/kibana_unattended.yml
- wazuh-packages/unattended_scripts/open-distro/kibana/7.x/kibana.yml
- wazuh-packages/unattended_scripts/open-distro/kibana/7.x/kibana_all_in_one.yml
- wazuh-packages/unattended_scripts/open-distro/kibana/7.x/kibana_unattended.yml
- wazuh-packages/unattended_scripts/open-distro/unattended-installation/distributed/templates/kibana_unattended.yml
- /etc/kibana/kibana.yml
<br>Changes made to get Portal9 logos instead of Wazuh logos:
- Add logos to /public/assets (for this repository)
- grep -R (wazuh logo file name) to find references of logo to be changed in files
- Changed specified wazuh logo name (ex. icon_blue.svg) to Portal9 file name
