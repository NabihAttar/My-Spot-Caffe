const ContactMap = () => {
    return (
        <>
            <div className="maps-area overflow-hidden">
  <div className="google-maps">
    <iframe
      src="https://www.google.com/maps?q=33.998154,36.215036&z=16&output=embed"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  </div>
</div>

        </>
    );
};

export default ContactMap;