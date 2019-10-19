import boto3
import os
import json
import uuid
import decimal
from boto3.dynamodb.conditions import Key, Attr
from botocore.exceptions import ClientError

dynamo_table = os.environ['DYNAMO_TABLE']
drone_id = 'drone_01'


# Helper class to convert a DynamoDB item to JSON.
class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)


def speed(event, context):
    body = event['body']
    speed_option = body['speed_option']

    # Construct message
    state = {
        "idempotency": str(uuid.uuid1()),
        "commands": [
            {
                "command": "barrel_roll",
                "argument": "false"
            },
            {
                "command": "absolute_altitude",
                "argument": 200
            },
            {
                "command": "relative_altitude",
                "argument": -50
            },
            {
                "command": "go_waypoint",
                "argument": "alpha"
            }
        ]
    }

    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(dynamo_table)
    response = table.put_item(
        Item={
            'droneId': drone_id,
            'state': state
        }
    )

    response = {
        "headers": {
            "Access-Control-Allow-Origin": "*",
        },
        "statusCode": 200
    }

    return response


def poll(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(dynamo_table)
    try:
        response = table.query(
            KeyConditionExpression=Key('droneId').eq(drone_id)
        )
    except (ClientError, KeyError) as e:
        print(e)

    else:
        item = response['Items'][0]['state']
        response = {
            "headers": {
                "Access-Control-Allow-Origin": "*",
            },
            "statusCode": 200,
            "body": json.dumps(item, cls=DecimalEncoder)
        }

        return response
