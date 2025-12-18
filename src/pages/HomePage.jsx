import ImageSlider from "../components/ui/ImageSlider";
import OperatorCard from "../components/ui/OperatorCard";
import FeatureCard from "../components/ui/FeatureCard";
import ContentCard from "../components/ui/ContentCard";
import PlanItem from "../components/ui/PlanItem";

// LOGOS
import AirtelLogo from "../assets/logos/Airtel.jpg";
import JioLogo from "../assets/logos/Jio.png";
import ViLogo from "../assets/logos/VI Vodafone Idea.png";
import BSNLLogo from "../assets/logos/BSNL-logo.png";

// IMAGES
import mobileRechargeImg from "../assets/mobile recharge.webp";
import imageSectionImg from "../assets/image section.png";

export default function HomePage({ setSelectedOperator, setPage, plans }) {
  return (
    <>
      {/* HERO SECTION */}
      <div className="text-center mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
          Mobile Recharge
          <span className="block text-lg md:text-xl lg:text-2xl font-normal text-gray-300 mt-2">
            Fast, Secure & Hassle-free
          </span>
        </h1>
        
        <div className="inline-flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-gray-300 text-sm md:text-base">24/7 Service Available</span>
        </div>
      </div>

      {/* SLIDER */}
      <div className="mb-8 md:mb-10">
        <ImageSlider />
      </div>

      {/* OPERATOR SELECTION */}
      <div className="bg-gray-800/60 backdrop-blur-lg rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 shadow-xl border border-gray-700">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Select Your Operator
          </h2>
          <p className="text-gray-400">
            Click on your preferred operator to view plans
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          <OperatorCard
            color="from-gray-700 to-gray-800"
            logo={AirtelLogo}
            name="Airtel"
            description="4G/5G Networks"
            onClick={() => {
              setSelectedOperator("Airtel");
              setPage("plans");
            }}
          />

          <OperatorCard
            color="from-gray-700 to-gray-800"
            logo={JioLogo}
            name="Jio"
            description="Digital Services"
            onClick={() => {
              setSelectedOperator("Jio");
              setPage("plans");
            }}
          />

          <OperatorCard
            color="from-gray-700 to-gray-800"
            logo={ViLogo}
            name="Vi"
            description="Fast Connectivity"
            onClick={() => {
              setSelectedOperator("Vi");
              setPage("plans");
            }}
          />

          <OperatorCard
            color="from-gray-700 to-gray-800"
            logo={BSNLLogo}
            name="BSNL"
            description="Nationwide Coverage"
            onClick={() => {
              setSelectedOperator("BSNL");
              setPage("plans");
            }}
          />
        </div>
      </div>

      {/* FEATURES GRID */}
      <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
        <FeatureCard
          icon="⚡"
          title="Instant Recharge"
          description="Get your recharge activated within seconds"
        />
        <FeatureCard
          icon="🔒"
          title="Secure Payments"
          description="100% secure payment gateway with encryption"
        />
        <FeatureCard
          icon="24/7"
          title="24/7 Support"
          description="Round-the-clock customer support"
        />
      </div>

      {/* ABOUT SECTION */}
      <ContentCard
        title="About Our Service"
        image={mobileRechargeImg}
        content={
          <div className="space-y-4">
            <p className="text-gray-300">
              We provide a seamless mobile recharge experience for all major telecom operators across India. 
              Our platform ensures instant activation, competitive pricing, and complete transaction security.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <p className="font-semibold text-white">10M+</p>
                <p className="text-sm text-gray-400">Recharges Processed</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <p className="font-semibold text-white">4.8★</p>
                <p className="text-sm text-gray-400">Customer Rating</p>
              </div>
            </div>
          </div>
        }
      />

      {/* POPULAR PLANS SECTION */}
      <ContentCard
        title="Trending Recharge Plans"
        image={imageSectionImg}
        content={
          <div className="space-y-4">
            <p className="text-gray-300 mb-4">
              Check out our most popular recharge plans chosen by thousands of users:
            </p>
            <div className="space-y-3">
              {plans.filter(plan => plan.popular).slice(0, 3).map((plan, index) => (
                <PlanItem
                  key={plan._id || index}
                  operator={plan.operator}
                  price={plan.price}
                  data={plan.data}
                  validity={plan.validity}
                  popular={plan.popular}
                />
              ))}
              {plans.filter(plan => plan.popular).length === 0 && (
                <>
                  <PlanItem
                    operator="Airtel"
                    price={199}
                    data="1.5GB/day"
                    validity="28 days"
                    popular={true}
                  />
                  <PlanItem
                    operator="Jio"
                    price={399}
                    data="2GB/day"
                    validity="56 days"
                    popular={true}
                  />
                  <PlanItem
                    operator="Vi"
                    price={479}
                    data="1.5GB/day"
                    validity="56 days"
                    popular={true}
                  />
                </>
              )}
            </div>
          </div>
        }
      />
    </>
  );
}