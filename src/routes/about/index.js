import React from "react";
import { Helmet } from "react-helmet";

const About = () => (
  <>
    <Helmet>
      <title>Über das Projekt</title>
    </Helmet>

    <p>
      Der private Autoverkehr hat einen sehr großen Anteil an{" "}
      <strong>klimaschädlichen Emissionen</strong>. Besonders in Städten mindert
      er durch <strong>Abgase, Lärm und Platzbedarf</strong> die Lebensqualität
      der Bürger*innen. Die Förderung von alternativen Mobilitätskonzepten ist
      demnach ein wichtiger Schritt hin zu einer klimaschonenderen Gesellschaft
      und lebenswerteren Gemeinden.
    </p>

    <p>
      Aktuell gibt es allerdings viele Herausforderungen. Das ÖPNV-Angebot ist
      unzureichend, die Fahrrad-Infrastruktur mangelhaft und es wurde und wird
      in Teilen der Politik und Stadtplanung dem PKW-Verkehr noch eine zu hohe
      Priorität eingeräumt, auch wenn dank eines gewandelten Bewusstseins in der
      Gesellschaft ein positiver Trend zu erkennen ist.
    </p>

    <p>
      Der Verkehrswende-Index soll auf verschiedenen Wegen dazu beitragen, dass
      sich die Situation weiter verbessert und der Trend beschleunigt wird. Zum
      einen sollen Verkehrsteilnehmende informiert und sensibilisiert werden, um
      so aktiv am Diskurs für eine nachhaltigere Verkehrsinfrastruktur
      teilnehmen zu können. Zum anderen soll durch den Vergleich ein Wettbewerb
      zwischen den Gemeinden gefördert werden. Diesen ist daran gelegen,
      attraktiv für Menschen mit Klimabewusstsein und möglicherweise
      bevorstehendem Ortswechsel (Ausbildung, Beruf) zu sein, insbesondere auch
      für junge Generationen.
    </p>

    <p>
      Offene Daten, insbesondere Daten aus dem Open-Street-Map-Projekt oder auch
      gesammelte Feinstaub-Werte, werden analysiert, um verschiedene für die
      Verkehrswende relevante Faktoren und Rankings zu berechnen.
    </p>
  </>
);

export default About;
