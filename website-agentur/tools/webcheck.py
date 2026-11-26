import csv,sys,re,socket,concurrent.futures as cf
def slug(n):
    n=n.lower().replace('&','and')
    n=re.sub(r'\b(ltd|limited|llp|plc|uk)\b\.?','',n)
    return re.sub(r'[^a-z0-9]','',n)
def has(n):
    s=slug(n)
    for tld in ('.co.uk','.com','.uk'):
        try: socket.gethostbyname(s+tld); return s+tld
        except: pass
    return ''
f=sys.argv[1]; rows=list(csv.DictReader(open(f)))[:int(sys.argv[2])]
with cf.ThreadPoolExecutor(20) as ex: res=list(ex.map(lambda r:has(r['company_name']),rows))
hit=sum(1 for x in res if x)
print(f, len(rows), 'Domain gefunden:',hit, f'({hit*100//len(rows)}%)')
