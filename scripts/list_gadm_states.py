import json, os
gadm_dir = os.path.expanduser('~/.xatra/data/gadm')
with open(os.path.join(gadm_dir, 'gadm41_IND_1.json'), 'r', encoding='utf-8') as f:
    data = json.load(f)

for feat in data['features']:
    props = feat['properties']
    gid = props.get('GID_1', '?')
    name = props.get('NAME_1', '?')
    print(f"{gid}: {name}")
