---
date: '2026-04-01'
title: Check If an IP Address Belongs to AWS
description: A quick tip to check whether an IP address belongs to AWS, including which service and region it's in.
---
## Check If an IP Address Belongs to AWS

At work, all of our services run in AWS, so when I'm looking at logs or investigating traffic I often need to know whether an IP address belongs to AWS. We do have all of our public egress IPs documented, but sometimes you just want a quick way to check an arbitrary IP without digging through internal docs. AWS publishes their complete list of IP ranges as a [public JSON file](https://ip-ranges.amazonaws.com/ip-ranges.json), and with a bit of Python you can check any IP against it in seconds.

Add this function to your `~/.bashrc` or `~/.zshrc`:

```bash
awsip() {
  curl -s https://ip-ranges.amazonaws.com/ip-ranges.json | python3 -c "
import json, sys, ipaddress
data = json.load(sys.stdin)
for ip in sys.argv[1:]:
    addr = ipaddress.ip_address(ip)
    matches = [f' {p[\"ip_prefix\"]} - {p[\"service\"]} ({p[\"region\"]})' for p in data['prefixes'] if addr in ipaddress.ip_network(p['ip_prefix'])]
    print(f'{ip}: AWS IP' if matches else f'{ip}: NOT an AWS IP')
    for m in matches: print(m)
    print()
" "$@"
}
```

Then you can just run `awsip 1.2.3.4 5.6.7.8` from your terminal. Replace the IPs in the `targets` list with whatever you want to check. For each match, it tells you which CIDR block the IP falls in, what AWS service uses it, and which region it's in. This has no dependencies beyond Python 3 and curl.
