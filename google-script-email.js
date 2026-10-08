/**
 * =========================================================================
 * KUNTUR AIRLINES - SCRIPT DE ENVÍO AUTOMÁTICO DE CORREO GMAIL
 * Remitente: laboratoriosafiro@gmail.com
 * =========================================================================
 * 
 * INSTRUCCIONES DE INSTALACIÓN (Solo toma 2 minutos):
 * 1. Ve a https://script.google.com/ e inicia sesión con: laboratoriosafiro@gmail.com
 * 2. Haz clic en "Nuevo proyecto" (o New project).
 * 3. Borra lo que haya en el editor y pega TODO este código.
 * 4. Haz clic en el ícono de Guardar (Floppy disk).
 * 5. Haz clic en el botón azul superior: "Implementar" (Deploy) ➔ "Nueva implementación" (New deployment).
 * 6. En el engranaje "Seleccionar tipo", elige: "Aplicación web" (Web app).
 * 7. Configura exactamente esto:
 *    - Descripción: Enviar Boarding Pass Kuntur
 *    - Ejecutar como (Execute as): "Yo (laboratoriosafiro@gmail.com)"  <-- ¡MUY IMPORTANTE!
 *    - Quién tiene acceso (Who has access): "Cualquiera" (Anyone)      <-- ¡MUY IMPORTANTE!
 * 8. Haz clic en "Implementar" (Deploy). Google te pedirá "Revisar permisos" ➔ Elige tu cuenta laboratoriosafiro@gmail.com ➔ Opciones avanzadas ➔ Ir a Proyecto (no seguro) ➔ Permitir.
 * 9. Copia la "URL de la aplicación web" (termina en /exec) y pégala en la variable GOOGLE_APPS_SCRIPT_URL de checkin.html y mostrador.html.
 * ¡Listo! Cada vez que un pasajero haga check-in, Gmail enviará el correo con el Boarding Pass adjunto automáticamente desde laboratoriosafiro@gmail.com.
 */

function doPost(e) {
  try {
    var rawData = e.postData ? e.postData.contents : "{}";
    var data = JSON.parse(rawData);

    var recipient = data.email;
    if (!recipient) {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Falta el correo destinatario" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var paxName = data.name || "Pasajero(a)";
    var bookingCode = data.bookingCode || "KT0815";
    var flight = data.flight || "KT 0815";
    var seat = data.seat || "03A";
    var gate = data.gate || "A01";
    var date = data.date || "14 de agosto de 2027";
    var departure = data.departureTime || "08:15 AM";
    var boarding = data.boardingTime || "07:35 AM";

    var subject = "🎫 Tu Boarding Pass Oficial " + flight + " · Kuntur Airlines (" + paxName + ")";

    var htmlBody = `
      <div style="margin: 0; padding: 25px 15px; background-color: #120101; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #fdf8eb;">
        <div style="max-width: 580px; margin: 0 auto; background: #260404; border: 2px solid #d5a75c; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          
          <!-- CABECERA -->
          <div style="background: linear-gradient(135deg, #3d0707 0%, #1f0303 100%); padding: 26px 20px; text-align: center; border-bottom: 2px solid #d5a75c;">
            <div style="color: #d5a75c; font-size: 11px; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 6px;">EL ESPÍRITU DE LOS ANDES</div>
            <h1 style="color: #f6e0b5; margin: 0; font-size: 26px; letter-spacing: 2px; font-weight: 900;">KUNTUR AIRLINES</h1>
            <div style="display: inline-block; margin-top: 10px; background: rgba(213,167,92,0.15); border: 1px solid #d5a75c; color: #f4dba5; font-size: 12px; font-weight: 700; padding: 5px 14px; border-radius: 999px;">
              ✈️ PASE DE ABORDAJE OFICIAL EMITIDO
            </div>
          </div>

          <!-- CONTENIDO PRINCIPAL -->
          <div style="padding: 26px 24px;">
            <p style="font-size: 16px; color: #fdf8eb; margin: 0 0 16px 0;">
              Hola <strong style="color: #f4dba5;">${paxName}</strong>,
            </p>
            <p style="font-size: 14px; color: #dcd0bc; line-height: 1.5; margin: 0 0 20px 0;">
              Tu Check-in para el vuelo oficial hacia el Pacífico colombiano ha sido procesado exitosamente. A continuación encontrarás los datos de tu tarjeta de embarque:
            </p>

            <!-- TARJETA DE RESUMEN DE VUELO -->
            <table style="width: 100%; border-collapse: separate; border-spacing: 0; background: rgba(0,0,0,0.3); border: 1px solid rgba(213,167,92,0.3); border-radius: 10px; margin-bottom: 22px;">
              <tr>
                <td style="padding: 12px 14px; border-bottom: 1px solid rgba(213,167,92,0.2); color: #d5a75c; font-size: 13px; font-weight: 600;">Vuelo</td>
                <td style="padding: 12px 14px; border-bottom: 1px solid rgba(213,167,92,0.2); color: #ffffff; font-size: 14px; font-weight: 800; text-align: right;">${flight}</td>
              </tr>
              <tr>
                <td style="padding: 12px 14px; border-bottom: 1px solid rgba(213,167,92,0.2); color: #d5a75c; font-size: 13px; font-weight: 600;">Ruta</td>
                <td style="padding: 12px 14px; border-bottom: 1px solid rgba(213,167,92,0.2); color: #ffffff; font-size: 13px; font-weight: 700; text-align: right;">Bogotá (BOG) ➔ Nuquí (NQU)</td>
              </tr>
              <tr>
                <td style="padding: 12px 14px; border-bottom: 1px solid rgba(213,167,92,0.2); color: #d5a75c; font-size: 13px; font-weight: 600;">Fecha de Vuelo</td>
                <td style="padding: 12px 14px; border-bottom: 1px solid rgba(213,167,92,0.2); color: #ffffff; font-size: 13px; text-align: right;">${date}</td>
              </tr>
              <tr>
                <td style="padding: 12px 14px; border-bottom: 1px solid rgba(213,167,92,0.2); color: #d5a75c; font-size: 13px; font-weight: 600;">Hora de Salida</td>
                <td style="padding: 12px 14px; border-bottom: 1px solid rgba(213,167,92,0.2); color: #ffffff; font-size: 13px; font-weight: 700; text-align: right;">${departure} <span style="color:#d5a75c;font-size:11px">(Abordaje: ${boarding})</span></td>
              </tr>
              <tr>
                <td style="padding: 12px 14px; border-bottom: 1px solid rgba(213,167,92,0.2); color: #d5a75c; font-size: 13px; font-weight: 600;">Sala / Puerta</td>
                <td style="padding: 12px 14px; border-bottom: 1px solid rgba(213,167,92,0.2); color: #f4dba5; font-size: 15px; font-weight: 800; text-align: right;">${gate}</td>
              </tr>
              <tr>
                <td style="padding: 12px 14px; border-bottom: 1px solid rgba(213,167,92,0.2); color: #d5a75c; font-size: 13px; font-weight: 600;">Asiento Asignado</td>
                <td style="padding: 12px 14px; border-bottom: 1px solid rgba(213,167,92,0.2); color: #f4dba5; font-size: 15px; font-weight: 800; text-align: right;">${seat} (ATR 42-500)</td>
              </tr>
              <tr>
                <td style="padding: 12px 14px; color: #d5a75c; font-size: 13px; font-weight: 600;">Código de Reserva (PNR)</td>
                <td style="padding: 12px 14px; color: #ffffff; font-size: 15px; font-weight: 800; letter-spacing: 2px; text-align: right; font-family: monospace;">${bookingCode}</td>
              </tr>
            </table>

            <!-- MENSAJE DE ADJUNTO -->
            <div style="background: rgba(213,167,92,0.12); border: 1px dashed #d5a75c; border-radius: 10px; padding: 14px; text-align: center; margin-bottom: 22px;">
              <span style="font-size: 20px; display: block; margin-bottom: 6px;">📥 🎫</span>
              <div style="color: #f4dba5; font-size: 13px; font-weight: 700; margin-bottom: 4px;">
                ¡Tu Boarding Pass oficial ha sido adjuntado a este correo!
              </div>
              <div style="color: #dcd0bc; font-size: 12px;">
                Revisa el archivo adjunto <b>BoardingPass-${bookingCode}.png</b> para ver tu pase completo con el diseño imperial de Kuntur Airlines y código QR.
              </div>
            </div>

            <!-- TRAYECTO -->
            <div style="font-size: 12px; color: #b7a992; line-height: 1.5; border-top: 1px solid rgba(213,167,92,0.2); padding-top: 14px;">
              <b>🗺️ Trayecto de Vuelo (367 km):</b> Cundinamarca ➔ Tolima ➔ Eje Cafetero ➔ Chocó ➔ Costa del Pacífico colombiano.<br>
              <b>Aeropuertos:</b> El Dorado (BOG, T1) ➔ Aeropuerto Reyes Murillo (NQU).
            </div>
          </div>

          <!-- PIE DE CORREO -->
          <div style="background: #190202; padding: 18px 20px; text-align: center; border-top: 1px solid rgba(213,167,92,0.3); font-size: 11px; color: #9c8e76;">
            Mensaje oficial generado por el Sistema de Despacho de <b>Kuntur Airlines</b>.<br>
            Remitente verificado: <a href="mailto:laboratoriosafiro@gmail.com" style="color: #d5a75c; text-decoration: none;">laboratoriosafiro@gmail.com</a>
          </div>

        </div>
      </div>
    `;

    var mailOptions = {
      name: "Kuntur Airlines",
      htmlBody: htmlBody
    };

    // Adjuntar la imagen si viene en Base64
    if (data.imageBase64 && typeof data.imageBase64 === "string" && data.imageBase64.length > 50) {
      try {
        var base64Clean = data.imageBase64.replace(/^data:image\/\w+;base64,/, "");
        var decoded = Utilities.base64Decode(base64Clean);
        var blob = Utilities.newBlob(decoded, "image/png", "BoardingPass-" + bookingCode + ".png");
        mailOptions.attachments = [blob];
      } catch(attachErr) {
        Logger.log("Error decodificando imagen: " + attachErr);
      }
    }

    // Enviar el correo usando Gmail de la cuenta laboratoriosafiro@gmail.com
    GmailApp.sendEmail(recipient, subject, "", mailOptions);

    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Correo enviado exitosamente a " + recipient }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Servicio de Correo de Kuntur Airlines activo. Remitente: laboratoriosafiro@gmail.com")
    .setMimeType(ContentService.MimeType.TEXT);
}
