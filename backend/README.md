# Ground Controller

Ground control system for drone systems using voice control

## Setup Serverless

```bash
npm install -g serverless
serverless config credentials --provider aws --key <ACCESS KEY ID> --secret <SECRET KEY>
```

## Python Requirements

```bash
serverless plugin install -n serverless-python-requirements
serverless plugin install -n serverless-pseudo-parameters
```

Add the following to the `serveress.yml` file

```yaml
plugins:
  - serverless-python-requirements
  - serverless-pseudo-parameters

custom:
  pythonRequirements:
    dockerizePip: non-linux
```

## Deploy

```bash
npm install
serverless deploy
```

## Invoke Function

You can invoke your deployed functions using the following

```bash
# Activate a python envirionment locally
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

# Test locally
serverless invoke local -f altitude --path test_altitude.json
serverless invoke local -f waypoint --path test_waypoint.json
serverless invoke local -f poll

# Test Deployed version
serverless invoke -f altitude --path test_altitude.json
serverless invoke -f waypoint --path test_waypoint.json
serverless invoke -f poll
```
