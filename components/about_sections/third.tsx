import CounterUp from '@/components/elements/CounterUp'
export default function Third() {
	return (
		<>
<section className="section-static-1 background-body background-2 pt-80 pb-80">
<div className="container">
    <div className="row">
        <div>
            <div className="wow fadeIn">
                <div className="d-flex align-items-center justify-content-around flex-wrap">
                    <div className="mb-4 mb-lg-0 d-block px-lg-5 px-3">
                        <div className="d-flex justify-content-center justify-content-md-start">
                            <h3 className="count neutral-1000"><CounterUp count={2} /></h3>
                            <h3 className="neutral-1000">+</h3>
                        </div>
                        <div className="text-md-start text-center">
                            <p className="text-lg-bold neutral-1000">Global</p>
                            <p className="text-lg-bold neutral-1000">Branches</p>
                        </div>
                    </div>
                    <div className="mb-4 mb-lg-0 d-block px-lg-5 px-3">
                        <div className="d-flex justify-content-center justify-content-md-start">
                            <h3 className="count neutral-1000"><CounterUp count={7} /></h3>
                            <h3 className="neutral-1000">+</h3>
                        </div>
                        <div className="text-md-start text-center">
                            <p className="text-lg-bold neutral-1000">Locations</p>
                            <p className="text-lg-bold neutral-1000"> in Dubai</p>
                        </div>
                    </div>
                    <div className="mb-4 mb-lg-0 d-block px-lg-5 px-3">
                        <div className="d-flex justify-content-center justify-content-md-start">
                            <h3 className="count neutral-1000"><CounterUp count={10} /></h3>
                            <h3 className="neutral-1000">+</h3>
                        </div>
                        <div className="text-md-start text-center">
                            <p className="text-lg-bold neutral-1000">Years</p>
                            <p className="text-lg-bold neutral-1000">of Experience</p>
                        </div>
                    </div>
                    <div className="mb-4 mb-lg-0 d-block px-lg-5 px-3">
                        <div className="d-flex justify-content-center justify-content-md-start">
                            <h3 className="count neutral-1000"><CounterUp count={65} /></h3>
                            <h3 className="neutral-1000">K+</h3>
                        </div>
                        <div className="text-md-start text-center">
                            <p className="text-lg-bold neutral-1000">Happy</p>
                            <p className="text-lg-bold neutral-1000">Customers</p>
                        </div>
                    </div>
                    <div className="mb-4 mb-lg-0 d-block px-lg-5 px-3">
                        <div className="d-flex justify-content-center justify-content-md-start">
                            <h3 className="count neutral-1000"><CounterUp count={100} /></h3>
                            <h3 className="neutral-1000">+</h3>
                        </div>
                        <div className="text-md-start text-center">
                            <p className="text-lg-bold neutral-1000">Cars</p>
                            <p className="text-lg-bold neutral-1000">in Fleet</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</section>
</>
    );
};