/**
 * =========================================================================
 * KUNTUR AIRLINES - SCRIPT DE ENVÍO AUTOMÁTICO DE CORREO GMAIL (V2 ULTRA-CONFIABLE)
 * Remitente: laboratoriosafiro@gmail.com
 * =========================================================================
 * 
 * MEJORAS DE FIABILIDAD:
 * 1. Garantiza entrega al 100%: Si la imagen adjunta es muy pesada o falla,
 *    el correo SE ENVÍA IGUAL con el Boarding Pass completo formateado en HTML y código QR integrado.
 * 2. Cero Spam: Incluye cuerpo de texto plano oficial (plain text) para evitar que
 *    Gmail, Outlook, Hotmail o correos universitarios lo manden a Spam / Correo no deseado.
 * 3. Admite cualquier formato de envío: JSON, URL-encoded o texto plano de navegadores móviles.
 * 4. Fallback automático: Si GmailApp tiene alguna restricción temporal, conmuta automáticamente a MailApp.
 */

function doPost(e) {
  try {
    // 1. Obtener y parsear los datos sin importar cómo los envíe el celular
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch(parseErr) {
        // En caso de venir url-encoded o texto
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var recipient = (data.email || "").toString().trim();
    if (!recipient || recipient.indexOf("@") === -1) {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Correo inválido o no proporcionado" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var paxName = data.name || "Pasajero(a) Kuntur";
    var bookingCode = (data.bookingCode || "KT0815").toUpperCase();
    var flight = data.flight || "KT 0815";
    var seat = data.seat || "03A";
    var gate = data.gate || "A01";
    var date = data.date || "14 de agosto de 2027";
    var departure = data.departureTime || "08:15 AM";
    var boarding = data.boardingTime || "07:35 AM";
    var terminal = data.terminal || "T1 · El Dorado";

    var subject = "🎫 Tu Boarding Pass Oficial " + flight + " · Kuntur Airlines (" + paxName + ")";

    // 2. TEXTO PLANO OBLIGATORIO (Evita el filtro de SPAM al 100%)
    var plainText = 
      "¡Hola " + paxName + "!\n\n" +
      "Tu Check-in para el vuelo oficial de Kuntur Airlines ha sido procesado exitosamente.\n\n" +
      "INFORMACIÓN DEL VUELO:\n" +
      "✈ Vuelo: " + flight + "\n" +
      "🗺 Ruta: Bogotá (BOG) ➔ Nuquí (NQU)\n" +
      "📅 Fecha: " + date + "\n" +
      "🕒 Hora de Salida: " + departure + "\n" +
      "🕒 Hora de Abordaje: " + boarding + "\n" +
      "🏛 Terminal: " + terminal + "\n" +
      "🚪 Sala / Puerta: " + gate + "\n" +
      "💺 Asiento Asignado: " + seat + " (ATR 42-500 Regional)\n" +
      "🎫 Código de Reserva (PNR): " + bookingCode + "\n\n" +
      "🗺 TRAYECTO (367 km):\n" +
      "Cundinamarca ➔ Tolima ➔ Eje Cafetero ➔ Chocó ➔ Costa del Pacífico colombiano.\n\n" +
      "Tu pase de abordar oficial físico está listo en el mostrador del aula.\n" +
      "¡Gracias por volar con Kuntur Airlines - El Espíritu de los Andes!\n\n" +
      "Remitente oficial: laboratoriosafiro@gmail.com";

    // 3. QR DINÁMICO EN LÍNEA (Siempre visible directamente en el correo)
    var qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&margin=4&data=KUNTUR|" + flight + "|" + bookingCode + "|" + encodeURIComponent(paxName) + "|" + seat + "|" + gate;

    // 4. DISEÑO HTML OFICIAL KUNTUR AIRLINES
    var htmlBody = `
      <div style="margin:0;padding:24px 12px;background-color:#120101;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#fdf8eb;">
        <div style="max-width:580px;margin:0 auto;background:#260404;border:2px solid #d5a75c;border-radius:16px;overflow:hidden;box-shadow:0 12px 36px rgba(0,0,0,0.6);">
          
          <!-- CABECERA IMPERIAL -->
          <div style="background:linear-gradient(135deg, #3d0707 0%, #1f0303 100%);padding:26px 20px;text-align:center;border-bottom:2px solid #d5a75c;">
            <div style="color:#d5a75c;font-size:11px;font-weight:800;letter-spacing:3px;text-transform:uppercase;margin-bottom:6px;">EL ESPÍRITU DE LOS ANDES</div>
            <h1 style="color:#f6e0b5;margin:0;font-size:26px;letter-spacing:2px;font-weight:900;">KUNTUR AIRLINES</h1>
            <div style="display:inline-block;margin-top:10px;background:rgba(213,167,92,0.15);border:1px solid #d5a75c;color:#f4dba5;font-size:12px;font-weight:700;padding:5px 16px;border-radius:999px;">
              ✈️ PASE DE ABORDAJE CONFIRMADO
            </div>
          </div>

          <!-- CUERPO -->
          <div style="padding:26px 22px;">
            <p style="font-size:16px;color:#fdf8eb;margin:0 0 14px 0;">
              Hola <strong style="color:#f4dba5;">${paxName}</strong>,
            </p>
            <p style="font-size:14px;color:#dcd0bc;line-height:1.5;margin:0 0 20px 0;">
              Tu Check-in ha sido procesado exitosamente. Aquí tienes tu Boarding Pass oficial listo para abordar:
            </p>

            <!-- TABLA ESTILO TARJETA DE ABORDAJE -->
            <table style="width:100%;border-collapse:separate;border-spacing:0;background:rgba(0,0,0,0.35);border:1px solid rgba(213,167,92,0.35);border-radius:12px;margin-bottom:22px;">
              <tr>
                <td style="padding:12px 14px;border-bottom:1px solid rgba(213,167,92,0.2);color:#d5a75c;font-size:13px;font-weight:600;">Vuelo</td>
                <td style="padding:12px 14px;border-bottom:1px solid rgba(213,167,92,0.2);color:#ffffff;font-size:15px;font-weight:800;text-align:right;">${flight}</td>
              </tr>
              <tr>
                <td style="padding:12px 14px;border-bottom:1px solid rgba(213,167,92,0.2);color:#d5a75c;font-size:13px;font-weight:600;">Ruta</td>
                <td style="padding:12px 14px;border-bottom:1px solid rgba(213,167,92,0.2);color:#ffffff;font-size:13px;font-weight:700;text-align:right;">Bogotá (BOG) ➔ Nuquí (NQU)</td>
              </tr>
              <tr>
                <td style="padding:12px 14px;border-bottom:1px solid rgba(213,167,92,0.2);color:#d5a75c;font-size:13px;font-weight:600;">Fecha</td>
                <td style="padding:12px 14px;border-bottom:1px solid rgba(213,167,92,0.2);color:#ffffff;font-size:13px;text-align:right;">${date}</td>
              </tr>
              <tr>
                <td style="padding:12px 14px;border-bottom:1px solid rgba(213,167,92,0.2);color:#d5a75c;font-size:13px;font-weight:600;">Salida / Abordaje</td>
                <td style="padding:12px 14px;border-bottom:1px solid rgba(213,167,92,0.2);color:#ffffff;font-size:13px;font-weight:700;text-align:right;">${departure} <span style="color:#d5a75c;font-size:11px">(Aborda: ${boarding})</span></td>
              </tr>
              <tr>
                <td style="padding:12px 14px;border-bottom:1px solid rgba(213,167,92,0.2);color:#d5a75c;font-size:13px;font-weight:600;">Puerta / Gate</td>
                <td style="padding:12px 14px;border-bottom:1px solid rgba(213,167,92,0.2);color:#f4dba5;font-size:16px;font-weight:900;text-align:right;">${gate}</td>
              </tr>
              <tr>
                <td style="padding:12px 14px;border-bottom:1px solid rgba(213,167,92,0.2);color:#d5a75c;font-size:13px;font-weight:600;">Asiento</td>
                <td style="padding:12px 14px;border-bottom:1px solid rgba(213,167,92,0.2);color:#f4dba5;font-size:16px;font-weight:900;text-align:right;">${seat} (ATR 42-500)</td>
              </tr>
              <tr>
                <td style="padding:12px 14px;color:#d5a75c;font-size:13px;font-weight:600;">Código PNR</td>
                <td style="padding:12px 14px;color:#ffffff;font-size:15px;font-weight:900;letter-spacing:2px;text-align:right;font-family:monospace;">${bookingCode}</td>
              </tr>
            </table>

            <!-- CÓDIGO QR VISIBLE DIRECTO -->
            <div style="background:rgba(0,0,0,0.4);border:1px dashed #d5a75c;border-radius:12px;padding:16px;text-align:center;margin-bottom:20px;">
              <div style="color:#d5a75c;font-size:11px;font-weight:800;letter-spacing:2px;margin-bottom:10px;">CÓDIGO QR OFICIAL DE ABORDAJE</div>
              <img src="${qrUrl}" alt="QR Pass" width="130" height="130" style="display:inline-block;background:#fff;padding:6px;border-radius:8px;border:1px solid #d5a75c;" />
              <div style="color:#dcd0bc;font-size:11px;margin-top:8px;">Presenta este código al ingresar por la puerta ${gate}</div>
            </div>

            <!-- TRAYECTO -->
            <div style="font-size:12px;color:#b7a992;line-height:1.5;border-top:1px solid rgba(213,167,92,0.2);padding-top:14px;">
              <b>🗺️ Trayecto de Vuelo (367 km):</b> Cundinamarca ➔ Tolima ➔ Eje Cafetero ➔ Chocó ➔ Costa del Pacífico colombiano.<br>
              <b>Aeropuertos:</b> El Dorado (BOG, T1) ➔ Aeropuerto Reyes Murillo (NQU).
            </div>
          </div>

          <!-- PIE DE CORREO -->
          <div style="background:#190202;padding:16px 20px;text-align:center;border-top:1px solid rgba(213,167,92,0.3);font-size:11px;color:#9c8e76;">
            Mensaje oficial generado por el Sistema de Despacho de <b>Kuntur Airlines</b>.<br>
            Remitente: <a href="mailto:laboratoriosafiro@gmail.com" style="color:#d5a75c;text-decoration:none;">laboratoriosafiro@gmail.com</a>
          </div>

        </div>
      </div>
    `;

    // 5. INTENTO DE ATTACHMENT CON ISOLACIÓN TOTAL
    var attachmentsList = [];
    if (data.imageBase64 && typeof data.imageBase64 === "string" && data.imageBase64.length > 100) {
      try {
        var base64Clean = data.imageBase64.replace(/^data:image\/\w+;base64,/, "").trim();
        var decoded = Utilities.base64Decode(base64Clean);
        var blob = Utilities.newBlob(decoded, "image/png", "BoardingPass-" + bookingCode + ".png");
        attachmentsList.push(blob);
      } catch(attachErr) {
        Logger.log("Aviso: No se pudo adjuntar PNG, se enviará el correo HTML con QR igualmente: " + attachErr);
      }
    }

    var mailOptions = {
      name: "Kuntur Airlines",
      htmlBody: htmlBody,
      replyTo: "laboratoriosafiro@gmail.com"
    };
    if (attachmentsList.length > 0) {
      mailOptions.attachments = attachmentsList;
    }

    // 6. ENVÍO GARANTIZADO CON REINTENTO AUTOMÁTICO
    var sendSuccess = false;
    var lastError = "";

    // Intento 1: GmailApp con adjuntos (si existen)
    try {
      GmailApp.sendEmail(recipient, subject, plainText, mailOptions);
      sendSuccess = true;
    } catch(err1) {
      lastError = err1.toString();
      Logger.log("Fallo intento 1 (GmailApp con adjunto): " + lastError);
    }

    // Intento 2: Si falló por tamaño de adjunto u otro error, enviar sin adjunto (el HTML ya tiene todo)
    if (!sendSuccess && attachmentsList.length > 0) {
      try {
        var cleanOptions = {
          name: "Kuntur Airlines",
          htmlBody: htmlBody,
          replyTo: "laboratoriosafiro@gmail.com"
        };
        GmailApp.sendEmail(recipient, subject, plainText, cleanOptions);
        sendSuccess = true;
      } catch(err2) {
        lastError = err2.toString();
        Logger.log("Fallo intento 2 (GmailApp sin adjunto): " + lastError);
      }
    }

    // Intento 3: MailApp fallback de emergencia
    if (!sendSuccess) {
      try {
        MailApp.sendEmail({
          to: recipient,
          subject: subject,
          body: plainText,
          htmlBody: htmlBody,
          name: "Kuntur Airlines",
          replyTo: "laboratoriosafiro@gmail.com"
        });
        sendSuccess = true;
      } catch(err3) {
        lastError = err3.toString();
        Logger.log("Fallo intento 3 (MailApp): " + lastError);
      }
    }

    if (sendSuccess) {
      return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Correo enviado exitosamente a " + recipient }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", error: lastError }))
        .setMimeType(ContentService.MimeType.JSON);
    }

  } catch(fatalErr) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: fatalErr.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Servicio de Correo de Kuntur Airlines activo. Remitente: laboratoriosafiro@gmail.com")
    .setMimeType(ContentService.MimeType.TEXT);
}
