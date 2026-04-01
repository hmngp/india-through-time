import os
gdir = 'c:/Users/HEMANG PATEL/india-through-time/public/geojson'
total = 0
for f in sorted(os.listdir(gdir)):
    if f.endswith('.geojson'):
        sz = os.path.getsize(os.path.join(gdir, f))
        total += sz
        print(f"{f:40s} {sz:>12,} bytes  ({sz/1024:.0f} KB)")
print(f"{'TOTAL':40s} {total:>12,} bytes  ({total/1024/1024:.1f} MB)")
