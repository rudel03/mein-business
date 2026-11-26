#!/usr/bin/env bash
# Lädt neue UK-Firmen je SIC-Code als CSV (kostenlose Companies-House-Suche, ohne API-Schlüssel).
# Aufruf: ./neue_firmen.sh 2026-11-16 2026-11-22 43210 96020 ...
# Ausgabe landet in ./daten_roh/ (nicht committen, DSGVO: Datensparsamkeit).
set -e
von=$1; bis=$2; shift 2
IFS=- read vj vm vt <<< "$von"; IFS=- read bj bm bt <<< "$bis"
mkdir -p daten_roh
B="https://find-and-update.company-information.service.gov.uk/advanced-search/csv?incorporationFromDay=$vt&incorporationFromMonth=$vm&incorporationFromYear=$vj&incorporationToDay=$bt&incorporationToMonth=$bm&incorporationToYear=$bj&status=active"
for s in "$@"; do
  curl -s "$B&sicCodes=$s" -o "daten_roh/sic_${s}_${von}_${bis}.csv"
  echo "$s: $(( $(wc -l < daten_roh/sic_${s}_${von}_${bis}.csv) - 1 )) neue Firmen"
  sleep 1
done
